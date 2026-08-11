import Link from 'next/link'
import FormularioRegistro from '@/components/FormularioRegistro'

export const metadata = {
  title: 'Formulario de Registro — CCJ Hidalgo 2026',
}

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-crema">
      {/* Header */}
      <div className="bg-verde-oscuro py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="text-crema/60 hover:text-crema text-sm flex items-center gap-1 mb-4 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="font-display text-4xl text-crema">Registro de asistencia</h1>
          <p className="text-crema/70 mt-2">
            CCJ Hidalgo 2026 · 10 agosto – 28 agosto
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <FormularioRegistro />
      </div>
    </main>
  )
}
