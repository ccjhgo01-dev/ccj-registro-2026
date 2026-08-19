import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { ACTIVIDADES, RegistroRecord } from '@/types/registro'

const ACTIVIDAD_TITULOS = new Map(ACTIVIDADES.map((a) => [a.id, a.titulo]))

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('registros')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const registros = (data ?? []) as RegistroRecord[]

  const headers = [
    'Folio', 'Nombre', 'Correo', 'Teléfono', 'Edad', 'Municipio', 'Institución',
    'Actividades', 'Cumbre', 'Cómo se enteró', 'Mensaje', 'Fecha',
  ]

  const rows = registros.map((r) => [
    r.folio,
    r.nombre_completo,
    r.correo,
    r.telefono,
    String(r.edad),
    r.municipio,
    r.institucion,
    r.actividades.map((id) => ACTIVIDAD_TITULOS.get(id) ?? id).join(' | '),
    r.asiste_cumbre ? 'Sí' : 'No',
    r.como_te_enteraste,
    r.mensaje ?? '',
    new Date(r.created_at).toLocaleString('es-MX'),
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((v) => csvEscape(String(v))).join(','))
    .join('\n')

  const bom = '﻿'

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="registros-ccj-hidalgo-2026.csv"',
    },
  })
}
