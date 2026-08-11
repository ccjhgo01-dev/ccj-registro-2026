-- ==============================================
-- CCJ Hidalgo 2026 — Migración: ampliar rango de edad a 18-30
-- Ejecutar en el SQL Editor de Supabase (proyecto ya creado).
--
-- El requisito de edad cambió de 18-29 a 18-30. La validación del
-- cliente y del server action ya aceptan hasta 30 años, pero el
-- CHECK constraint original de la tabla "registros" seguía limitado
-- a 29 — sin este ALTER, un registro válido de 30 años pasaría la
-- validación de la app y sería rechazado igual por Postgres al
-- insertar.
-- ==============================================

alter table public.registros drop constraint if exists registros_edad_check;

alter table public.registros
  add constraint registros_edad_check check (edad >= 18 and edad <= 30);
