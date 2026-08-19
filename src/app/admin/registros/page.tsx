import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { logoutAdmin } from '@/lib/adminActions'
import { ACTIVIDADES, RegistroRecord } from '@/types/registro'

export const metadata = { title: 'Registros — Admin CCJ Hidalgo 2026' }
export const dynamic = 'force-dynamic'

const ACTIVIDAD_TITULOS = new Map(ACTIVIDADES.map((a) => [a.id, a.titulo]))

function actividadesTexto(actividades: string[]): string {
  if (!actividades?.length) return '—'
  return actividades.map((id) => ACTIVIDAD_TITULOS.get(id) ?? id).join(', ')
}

export default async function AdminRegistrosPage() {
  const { data, error } = await supabaseAdmin
    .from('registros')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-crema p-8">
        <p className="text-red-600">Error al cargar registros: {error.message}</p>
      </main>
    )
  }

  const registros = (data ?? []) as RegistroRecord[]
  const total = registros.length
  const totalCumbre = registros.filter((r) => r.asiste_cumbre).length

  return (
    <main className="min-h-screen bg-crema p-4 sm:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-verde-oscuro">Registros — CCJ Hidalgo 2026</h1>
            <p className="text-tierra text-sm mt-1">
              {total} registros · {totalCumbre} para la Cumbre de Delegadxs
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/registros/export"
              className="bg-dorado hover:bg-dorado-claro text-tierra-oscuro font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
            >
              Exportar CSV
            </a>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="border-2 border-tierra/30 hover:border-tierra text-tierra-oscuro font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-dorado/20">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-beige text-verde-oscuro">
              <tr>
                <th className="px-4 py-3">Folio</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Edad</th>
                <th className="px-4 py-3">Municipio</th>
                <th className="px-4 py-3">Institución</th>
                <th className="px-4 py-3">Actividades</th>
                <th className="px-4 py-3">Cumbre</th>
                <th className="px-4 py-3">¿Cómo se enteró?</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dorado/10">
              {registros.map((r) => (
                <tr key={r.id} className="hover:bg-beige/40">
                  <td className="px-4 py-3 font-semibold text-verde-oscuro">{r.folio}</td>
                  <td className="px-4 py-3">{r.nombre_completo}</td>
                  <td className="px-4 py-3">{r.correo}</td>
                  <td className="px-4 py-3">{r.telefono}</td>
                  <td className="px-4 py-3">{r.edad}</td>
                  <td className="px-4 py-3">{r.municipio}</td>
                  <td className="px-4 py-3">{r.institucion}</td>
                  <td className="px-4 py-3 whitespace-normal max-w-xs">{actividadesTexto(r.actividades)}</td>
                  <td className="px-4 py-3">{r.asiste_cumbre ? 'Sí' : 'No'}</td>
                  <td className="px-4 py-3">{r.como_te_enteraste}</td>
                  <td className="px-4 py-3 whitespace-normal max-w-xs">{r.mensaje || '—'}</td>
                  <td className="px-4 py-3">{new Date(r.created_at).toLocaleString('es-MX')}</td>
                </tr>
              ))}
              {registros.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-tierra/60">
                    Todavía no hay registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
