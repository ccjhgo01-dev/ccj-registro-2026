'use client'

import { useState } from 'react'

const OPCIONES_APOYO = ['Efectivo', 'En especie', 'Ambos'] as const
type Apoyo = (typeof OPCIONES_APOYO)[number]

const INPUT_CLASS =
  'w-full bg-white border-l-4 border-verde-olivo/60 focus:border-verde-oscuro rounded-lg px-4 py-3 text-tierra-oscuro placeholder-tierra/40 shadow-sm outline-none transition-colors'

const LABEL_CLASS = 'block text-verde-oscuro font-semibold text-sm mb-1.5'

export default function ModalPatrocinador() {
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [organizacion, setOrganizacion] = useState('')
  const [apoyo, setApoyo] = useState<Apoyo | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  function construirMensaje() {
    return `Hola, me interesa apoyar a la CCJ Hidalgo 2026.
Nombre: ${nombre}
Organización: ${organizacion}
Tipo de apoyo: ${apoyo ?? 'No especificado'}
Mensaje: ${mensaje || 'Sin mensaje adicional'}`
  }

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault()
    const texto = construirMensaje()

    await navigator.clipboard.writeText(texto)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3500)

    // Cuando exista un número de WhatsApp para el equipo, reemplazar el
    // copiado al portapapeles de arriba por:
    // window.open(`https://wa.me/52XXXXXXXXXX?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block bg-dorado hover:bg-dorado-claro text-tierra-oscuro font-display font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        Ser patrocinador
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-crema rounded-3xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-tierra-oscuro/10 hover:bg-tierra-oscuro/20 flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M2 2l12 12M14 2 2 14" />
              </svg>
            </button>

            {/* Header */}
            <h2 className="font-display text-2xl sm:text-3xl text-verde-oscuro pr-8 mb-1">
              ¿Quieres apoyar la CCJ Hidalgo?
            </h2>
            <p className="text-tierra text-sm mb-6">
              Tu apoyo hace posible la cumbre climática juvenil del estado.
            </p>

            {/* Sección informativa */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-beige rounded-xl p-3 sm:p-4 border border-dorado/20">
                <p className="font-display font-semibold text-verde-oscuro text-sm mb-1">En efectivo</p>
                <p className="text-tierra text-xs leading-relaxed">
                  Gastos operativos, materiales y coffee break.
                </p>
              </div>
              <div className="bg-beige rounded-xl p-3 sm:p-4 border border-dorado/20">
                <p className="font-display font-semibold text-verde-oscuro text-sm mb-1">En especie</p>
                <p className="text-tierra text-xs leading-relaxed">
                  Papelería, impresión, garrafones, fruta y productos locales.
                </p>
              </div>
            </div>

            {/* Mini formulario */}
            <form onSubmit={handleEnviar} className="space-y-4">
              <div>
                <label className={LABEL_CLASS} htmlFor="patro-nombre">
                  Nombre completo
                </label>
                <input
                  id="patro-nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="patro-org">
                  Organización o empresa
                </label>
                <input
                  id="patro-org"
                  value={organizacion}
                  onChange={(e) => setOrganizacion(e.target.value)}
                  required
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <p className={LABEL_CLASS}>¿Cómo quieres apoyar?</p>
                <div className="flex flex-wrap gap-2">
                  {OPCIONES_APOYO.map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      onClick={() => setApoyo(opcion)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${
                        apoyo === opcion
                          ? 'bg-verde-olivo border-verde-olivo text-crema'
                          : 'bg-white border-dorado/30 text-tierra-oscuro hover:border-verde-olivo'
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="patro-mensaje">
                  Mensaje libre <span className="text-tierra/50 font-normal">(opcional)</span>
                </label>
                <textarea
                  id="patro-mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  placeholder="¿Qué tienes en mente?"
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-verde-olivo hover:bg-verde-oscuro text-crema font-display font-semibold text-lg py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Enviar propuesta
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-verde-oscuro text-crema text-sm font-semibold px-5 py-3 rounded-xl shadow-lg text-center">
          ¡Mensaje copiado! Envíalo a ccjhgo01@gmail.com
        </div>
      )}
    </>
  )
}
