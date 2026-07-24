-- ==============================================
-- CCJ Hidalgo 2026 — Rate limiting para /registro
-- Ejecutar en el SQL Editor de Supabase
--
-- ADVERTENCIA IMPORTANTE:
-- El insert a "registros" se hace desde un Server Action de Next.js
-- (el servidor de Vercel llama a Supabase), no desde el navegador
-- del usuario. Por eso el "x-forwarded-for" que llega aquí es la IP
-- saliente del servidor de Vercel, no la del visitante real. Este
-- rate limit por IP no va a distinguir usuarios reales mientras el
-- insert no venga acompañado de la IP real del visitante.
-- ==============================================

-- 1. Tabla de control de rate limit
create table if not exists public.rate_limit_registros (
  ip         text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_registros_ip_created_idx
  on public.rate_limit_registros (ip, created_at desc);

-- 2. Función que cuenta intentos recientes e inserta si hay cupo
create or replace function public.check_rate_limit(ip_address text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  intentos int;
begin
  select count(*)
    into intentos
    from public.rate_limit_registros
    where ip = ip_address
      and created_at > now() - interval '10 minutes';

  if intentos >= 3 then
    return false;
  end if;

  insert into public.rate_limit_registros (ip) values (ip_address);
  return true;
end;
$$;

-- 3. Trigger BEFORE INSERT en "registros" que aplica el límite
create or replace function public.enforce_rate_limit_registros()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  client_ip text;
begin
  client_ip := coalesce(
    nullif(
      trim(split_part(current_setting('request.headers', true)::json ->> 'x-forwarded-for', ',', 1)),
      ''
    ),
    'unknown'
  );

  if not public.check_rate_limit(client_ip) then
    raise exception 'Demasiados registros. Intenta de nuevo en 10 minutos.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_rate_limit_registros on public.registros;

create trigger trg_rate_limit_registros
  before insert on public.registros
  for each row
  execute function public.enforce_rate_limit_registros();

-- 4. RLS en rate_limit_registros — nadie escribe directo, solo el sistema
alter table public.rate_limit_registros enable row level security;

-- Sin políticas para "anon" ni "authenticated": con RLS activo y sin
-- políticas, esos roles no pueden leer ni escribir. Las únicas escrituras
-- posibles son las de check_rate_limit(), que corre como SECURITY DEFINER
-- (dueña de la función = dueña de la tabla) y por lo tanto sí puede
-- insertar, sin necesidad de una policy para anon.

-- 5. Limpieza de registros con más de 1 hora de antigüedad
create or replace function public.limpiar_rate_limit_registros()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.rate_limit_registros
  where created_at < now() - interval '1 hour';
$$;

-- Opción A — si tu proyecto de Supabase tiene pg_cron disponible
-- (Database → Extensions → pg_cron), descomenta estas líneas para
-- que la limpieza corra sola cada 15 minutos:

-- create extension if not exists pg_cron;
--
-- select cron.schedule(
--   'limpiar-rate-limit-registros',
--   '*/15 * * * *',
--   $$ select public.limpiar_rate_limit_registros(); $$
-- );

-- Opción B — si no tienes pg_cron, ejecuta manualmente cuando quieras
-- limpiar la tabla:
--
-- select public.limpiar_rate_limit_registros();
