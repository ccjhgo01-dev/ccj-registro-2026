-- ==============================================
-- CCJ Hidalgo 2026 — Verificación de RLS en 'registros'
-- Ejecutar manualmente en el SQL Editor de Supabase.
-- Este script es de SOLO LECTURA: no modifica políticas ni datos.
-- ==============================================

-- 1. Confirmar que RLS está habilitado en la tabla
select relname as tabla, relrowsecurity as rls_habilitado
from pg_class
where relname = 'registros';

-- 2. Listar todas las políticas activas en 'registros'
select
  polname                                   as politica,
  cmd                                       as comando,      -- r=select, a=insert, w=update, d=delete
  roles::regrole[]                          as roles,
  qual::text                                as using_expr,
  with_check::text                          as with_check_expr
from pg_policy
where polrelid = 'public.registros'::regclass;

-- Alternativa más legible, vía la vista estándar de Postgres:
select
  policyname,
  cmd,
  roles,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'registros';

-- 3. Chequeo puntual: ¿existe alguna política SELECT que incluya a 'anon'?
-- Debe devolver 0 filas. Si devuelve alguna, hay una brecha de seguridad.
select policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename = 'registros'
  and cmd = 'SELECT'
  and 'anon' = any(roles);
