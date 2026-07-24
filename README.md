# CCJ Hidalgo 2026 — Plataforma de Registro Oficial

Registro oficial para asistir a las actividades de la **Cumbre Climática Juvenil Hidalgo 2026**.
Co-organizado con LCOY México 2026 y REACCIONA Red de Acción Climática A.C.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 — paleta extraída del material gráfico oficial
- Supabase — base de datos PostgreSQL
- Vercel — despliegue automático

## Despliegue paso a paso

### 1. Supabase

1. Ir a supabase.com con la cuenta ccjhgo01@gmail.com
2. Crear nuevo proyecto: ccj-hidalgo-2026
3. En el SQL Editor, ejecutar supabase-schema.sql
4. Copiar Project URL y anon public key

### 2. GitHub

```bash
git init
git add .
git commit -m "feat: registro CCJ Hidalgo 2026"
git remote add origin https://github.com/ccjhgo01/ccj-registro-2026.git
git push -u origin main
```

### 3. Vercel

1. vercel.com con cuenta ccjhgo01@gmail.com
2. New Project -> importar repo ccj-registro-2026
3. Agregar variables de entorno:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy

## Contacto: ccjhgo01@gmail.com
