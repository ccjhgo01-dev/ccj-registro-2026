-- ==============================================
-- CCJ Hidalgo 2026 — Rate limiting por correo (defensa en profundidad)
-- Ejecutar en el SQL Editor de Supabase
--
-- Por qué una función SECURITY DEFINER y no un SELECT directo desde
-- el Server Action: el cliente de Supabase usado en el servidor de
-- Next.js se autentica con la anon key, y la tabla "registros" NO
-- tiene (ni debe tener) una política RLS que permita SELECT a "anon"
-- (ver supabase-check-rls.sql). Un SELECT directo desde ese rol
-- siempre devolvería 0 filas — el rate limit nunca bloquearía nada.
-- Esta función corre con los privilegios de su dueña (la tabla),
-- así que sí puede leer "registros", sin necesidad de abrir una
-- política SELECT general para anon.
-- ==============================================

create or replace function public.check_email_rate_limit(p_correo text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  recientes int;
begin
  select count(*)
    into recientes
    from public.registros
    where lower(correo) = lower(trim(p_correo))
      and created_at > now() - interval '5 minutes';

  return recientes = 0;
end;
$$;

-- El Server Action llama a esta función vía supabase.rpc(...) usando
-- la anon key, así que "anon" necesita permiso explícito de EXECUTE
-- (SECURITY DEFINER solo cambia los privilegios DENTRO de la función,
-- no quién puede invocarla).
grant execute on function public.check_email_rate_limit(text) to anon;
