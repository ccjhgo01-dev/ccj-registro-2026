import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { logoutAdmin } from '@/lib/adminActions'
import { RegistroRecord } from '@/types/registro'
import AdminRegistrosTable from '@/components/AdminRegistrosTable'

export const metadata = { title: 'Registros — Admin CCJ Hidalgo 2026' }
export const dynamic = 'force-dynamic'

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

        <AdminRegistrosTable registros={registros} />
      </div>
    </main>
  )
}
