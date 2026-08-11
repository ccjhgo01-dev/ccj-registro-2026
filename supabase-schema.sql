-- ==============================================
-- CCJ Hidalgo 2026 — Schema Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ==============================================

create table if not exists public.registros (
  id          uuid primary key default gen_random_uuid(),
  folio       text not null unique,
  
  -- Datos personales
  nombre_completo   text not null,
  correo            text not null,
  telefono          text not null,
  edad              smallint not null check (edad >= 18 and edad <= 30),
  municipio         text not null,
  institucion       text not null,
  
  -- Participación
  actividades       text[] not null default '{}',
  asiste_cumbre     boolean not null default false,
  
  -- Adicionales
  como_te_enteraste text not null,
  mensaje           text,
  
  created_at        timestamptz not null default now()
);

-- Índices útiles para el admin
create index on public.registros (created_at desc);
create index on public.registros (asiste_cumbre);
create index on public.registros (correo);

-- Row Level Security: escritura pública, lectura solo autenticados
alter table public.registros enable row level security;

create policy "Insertar registro público"
  on public.registros for insert
  to anon
  with check (true);

create policy "Ver registros solo admin"
  on public.registros for select
  to authenticated
  using (true);
