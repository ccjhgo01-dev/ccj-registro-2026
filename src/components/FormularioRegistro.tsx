'use client'

import { useState, useTransition } from 'react'
import { enviarRegistro } from '@/lib/actions'
import { ACTIVIDADES, MUNICIPIOS_HIDALGO, RegistroForm } from '@/types/registro'
import Link from 'next/link'
import Image from 'next/image'

const COMO_ENTERASTE = [
  'Instagram / redes sociales',
  'WhatsApp (grupo o contacto)',
  'Mi escuela / universidad',
  'Un amigo o familiar',
  'Evento anterior CCJ',
  'REACCIONA A.C.',
  'LCOY México',
  'Otro medio',
]

const EMPTY_FORM: RegistroForm = {
  nombre_completo: '',
  correo: '',
  telefono: '',
  edad: '',
  municipio: '',
  institucion: '',
  actividades: [],
  asiste_cumbre: false,
  como_te_enteraste: '',
  mensaje: '',
}

const INPUT_CLASS =
  'w-full bg-crema border-l-4 border-verde-olivo/60 focus:border-verde-oscuro rounded-lg px-4 py-3.5 text-tierra-oscuro placeholder-tierra/40 shadow-sm focus:bg-white transition-colors outline-none'

const LABEL_CLASS = 'block text-verde-oscuro font-bold text-base mb-1.5'

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="absolute inset-0 m-auto w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-opacity"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8.2 6.3 11.5 13 4.5" />
    </svg>
  )
}

function HeaderFranja() {
  return (
    <div className="flex items-center gap-4 bg-verde-oscuro rounded-2xl px-5 py-4">
      <div className="bg-crema rounded-lg px-2.5 py-1.5 shrink-0">
        <Image
          src="/images/logo-ccj.jpeg"
          alt="CCJ Hidalgo"
          width={1600}
          height={809}
          className="h-8 w-auto"
        />
      </div>
      <div className="h-9 w-px bg-crema/20 shrink-0" />
      <p className="text-crema font-display font-semibold text-xl tracking-wide leading-tight">
        Registro oficial
      </p>
    </div>
  )
}

export default function FormularioRegistro() {
  const [form, setForm] = useState<RegistroForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof RegistroForm, string>>>({})
  const [isPending, startTransition] = useTransition()
  const [resultado, setResultado] = useState<{ success: boolean; folio?: string; error?: string } | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'asiste_cumbre') {
        setForm((prev) => ({ ...prev, asiste_cumbre: checked }))
      } else if (name === 'actividades') {
        setForm((prev) => ({
          ...prev,
          actividades: checked
            ? [...prev.actividades, value]
            : prev.actividades.filter((a) => a !== value),
        }))
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name as keyof RegistroForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function validar(): boolean {
    const nuevos: typeof errors = {}
    if (!form.nombre_completo.trim()) nuevos.nombre_completo = 'Tu nombre es obligatorio.'
    if (!form.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
      nuevos.correo = 'Ingresa un correo válido.'
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, '').length < 10)
      nuevos.telefono = 'Teléfono de 10 dígitos.'
    if (!form.edad || Number(form.edad) < 18 || Number(form.edad) > 30)
      nuevos.edad = 'Debes tener entre 18 y 30 años.'
    if (!form.municipio) nuevos.municipio = 'Selecciona tu municipio.'
    if (!form.institucion.trim()) nuevos.institucion = 'Indica tu escuela u organización.'
    if (!form.como_te_enteraste) nuevos.como_te_enteraste = '¿Cómo nos conociste?'
    if (form.actividades.length === 0 && !form.asiste_cumbre)
      nuevos.actividades = 'Selecciona al menos una actividad o la cumbre.'
    setErrors(nuevos)
    return Object.keys(nuevos).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return
    startTransition(async () => {
      const res = await enviarRegistro(form)
      setResultado(res)
    })
  }

  /* ── ÉXITO ── */
  if (resultado?.success) {
    return (
      <div className="space-y-6">
        <HeaderFranja />
        <div className="bg-beige rounded-3xl p-8 md:p-12 border border-dorado/30 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-verde-olivo flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12.5 9.5 18 20 6" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-verde-oscuro mb-2">
            Registro exitoso
          </h2>
          <p className="text-tierra mb-6 text-lg">
            Te esperamos en la CCJ Hidalgo 2026. Guarda tu folio:
          </p>
          <div className="inline-block bg-verde-olivo text-crema font-display text-2xl px-8 py-4 rounded-2xl mb-6 tracking-widest">
            {resultado.folio}
          </div>
          <p className="text-tierra/70 text-sm mb-8">
            Comparte este folio con el equipo organizador el día del evento.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="bg-verde-olivo hover:bg-verde-oscuro text-crema font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Volver al inicio
            </Link>
            <button
              onClick={() => {
                setResultado(null)
                setForm(EMPTY_FORM)
              }}
              className="border-2 border-verde-olivo text-verde-olivo hover:bg-verde-olivo hover:text-crema font-semibold px-6 py-3 rounded-xl transition-all"
            >
              Registrar otra persona
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── FORMULARIO ── */
  return (
    <div className="space-y-8">
      <HeaderFranja />

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {resultado?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {resultado.error}
          </div>
        )}

        {/* SECCIÓN 1 — Datos personales */}
        <fieldset className="bg-beige rounded-2xl p-6 border border-dorado/20 space-y-5">
          <legend className="font-display text-verde-oscuro text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-verde-olivo text-crema flex items-center justify-center text-sm">1</span>
            Datos personales
          </legend>

          {/* Nombre */}
          <div>
            <label className={LABEL_CLASS} htmlFor="nombre_completo">
              Nombre completo <span className="text-dorado">*</span>
            </label>
            <input
              id="nombre_completo"
              name="nombre_completo"
              type="text"
              value={form.nombre_completo}
              onChange={handleChange}
              placeholder="Como aparece en tu identificación"
              className={INPUT_CLASS}
            />
            {errors.nombre_completo && <p className="text-red-600 text-xs mt-1">{errors.nombre_completo}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Correo */}
            <div>
              <label className={LABEL_CLASS} htmlFor="correo">
                Correo electrónico <span className="text-dorado">*</span>
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className={INPUT_CLASS}
              />
              {errors.correo && <p className="text-red-600 text-xs mt-1">{errors.correo}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label className={LABEL_CLASS} htmlFor="telefono">
                Teléfono <span className="text-dorado">*</span>
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                placeholder="10 dígitos"
                className={INPUT_CLASS}
              />
              {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Edad */}
            <div>
              <label className={LABEL_CLASS} htmlFor="edad">
                Edad <span className="text-dorado">*</span>
              </label>
              <input
                id="edad"
                name="edad"
                type="number"
                min={18}
                max={30}
                value={form.edad}
                onChange={handleChange}
                placeholder="18 a 30 años"
                className={INPUT_CLASS}
              />
              {errors.edad && <p className="text-red-600 text-xs mt-1">{errors.edad}</p>}
            </div>

            {/* Municipio */}
            <div>
              <label className={LABEL_CLASS} htmlFor="municipio">
                Municipio <span className="text-dorado">*</span>
              </label>
              <select
                id="municipio"
                name="municipio"
                value={form.municipio}
                onChange={handleChange}
                className={INPUT_CLASS}
              >
                <option value="">Selecciona...</option>
                {MUNICIPIOS_HIDALGO.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.municipio && <p className="text-red-600 text-xs mt-1">{errors.municipio}</p>}
            </div>
          </div>

          {/* Institución */}
          <div>
            <label className={LABEL_CLASS} htmlFor="institucion">
              Escuela, universidad u organización <span className="text-dorado">*</span>
            </label>
            <input
              id="institucion"
              name="institucion"
              type="text"
              value={form.institucion}
              onChange={handleChange}
              placeholder="UAEH, Tec Hidalgo, colectivo independiente..."
              className={INPUT_CLASS}
            />
            {errors.institucion && <p className="text-red-600 text-xs mt-1">{errors.institucion}</p>}
          </div>
        </fieldset>

        {/* SECCIÓN 2 — Actividades */}
        <fieldset className="bg-beige rounded-2xl p-6 border border-dorado/20">
          <legend className="font-display text-verde-oscuro text-xl font-semibold mb-1 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-verde-olivo text-crema flex items-center justify-center text-sm">2</span>
            ¿A qué actividades asistirás?
          </legend>
          <p className="text-tierra/70 text-sm mb-5 ml-9">Puedes seleccionar todas las que quieras.</p>

          {errors.actividades && (
            <p className="text-red-600 text-xs mb-3">{errors.actividades}</p>
          )}

          <div className="space-y-3">
            {ACTIVIDADES.map((act) => (
              <label
                key={act.id}
                className="flex gap-4 items-center p-5 rounded-xl bg-crema border-l-4 border-verde-olivo/40 has-[:checked]:border-verde-olivo has-[:checked]:bg-verde-olivo/10 cursor-pointer transition-colors"
              >
                <span className="relative shrink-0 w-6 h-6">
                  <input
                    type="checkbox"
                    name="actividades"
                    value={act.id}
                    checked={form.actividades.includes(act.id)}
                    onChange={handleChange}
                    className="peer sr-only"
                  />
                  <span className="absolute inset-0 rounded-md border-2 border-verde-olivo/50 bg-white peer-checked:bg-verde-olivo peer-checked:border-verde-olivo transition-colors" />
                  <CheckIcon />
                </span>
                <div>
                  <div className="flex flex-wrap gap-2 items-center mb-0.5">
                    <span className="text-dorado text-xs font-semibold">{act.fecha}</span>
                    {act.hora && <span className="text-dorado/70 text-xs">{act.hora}</span>}
                    {!act.confirmada && (
                      <span className="bg-tierra/10 text-tierra text-xs px-1.5 py-0.5 rounded">por confirmar</span>
                    )}
                  </div>
                  <p className="text-tierra-oscuro font-semibold text-sm">
                    {act.titulo}
                  </p>
                  {act.subtitulo && <p className="text-tierra/70 text-xs">{act.subtitulo}</p>}
                  {act.ponente && <p className="text-tierra/60 text-xs italic">{act.ponente}</p>}
                </div>
              </label>
            ))}

            {/* Opción cumbre */}
            <label className="flex gap-4 items-center p-5 rounded-xl bg-verde-oscuro/10 border-l-4 border-verde-olivo has-[:checked]:bg-verde-oscuro/20 cursor-pointer transition-colors">
              <span className="relative shrink-0 w-6 h-6">
                <input
                  type="checkbox"
                  name="asiste_cumbre"
                  checked={form.asiste_cumbre}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <span className="absolute inset-0 rounded-md border-2 border-verde-olivo bg-white peer-checked:bg-verde-olivo transition-colors" />
                <CheckIcon />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-verde-olivo text-crema text-xs px-2 py-0.5 rounded font-semibold">CUMBRE OFICIAL</span>
                  <span className="text-verde-oscuro text-xs font-semibold">27 – 28 agosto</span>
                </div>
                <p className="text-verde-oscuro font-semibold text-sm">
                  Quiero ser Delegadx en la Cumbre
                </p>
                <p className="text-tierra/60 text-xs">
                  El encuentro central donde construimos el posicionamiento juvenil de Hidalgo.
                </p>
              </div>
            </label>
          </div>
        </fieldset>

        {/* SECCIÓN 3 — Final */}
        <fieldset className="bg-beige rounded-2xl p-6 border border-dorado/20 space-y-5">
          <legend className="font-display text-verde-oscuro text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-verde-olivo text-crema flex items-center justify-center text-sm">3</span>
            Un poco más
          </legend>

          {/* ¿Cómo te enteraste? */}
          <div>
            <label className={LABEL_CLASS} htmlFor="como_te_enteraste">
              ¿Cómo te enteraste de la CCJ? <span className="text-dorado">*</span>
            </label>
            <select
              id="como_te_enteraste"
              name="como_te_enteraste"
              value={form.como_te_enteraste}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="">Selecciona...</option>
              {COMO_ENTERASTE.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errors.como_te_enteraste && (
              <p className="text-red-600 text-xs mt-1">{errors.como_te_enteraste}</p>
            )}
          </div>

          {/* Mensaje opcional */}
          <div>
            <label className={LABEL_CLASS} htmlFor="mensaje">
              ¿Algo que quieras compartir al equipo? <span className="text-tierra/50 font-normal text-sm">(opcional)</span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              placeholder="Proyectos, preguntas, alergias, necesidades especiales..."
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>
        </fieldset>

        {/* Aviso de privacidad */}
        <p className="text-tierra/60 text-xs text-center px-4">
          Tus datos se utilizarán únicamente para la gestión de la CCJ Hidalgo 2026.
          No se compartirán con terceros sin tu consentimiento.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-verde-olivo hover:bg-verde-oscuro disabled:opacity-60 disabled:cursor-not-allowed text-crema font-display font-semibold text-2xl py-5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-crema/30 border-t-crema rounded-full animate-spin" />
              Enviando registro...
            </>
          ) : (
            'Confirmar mi registro'
          )}
        </button>
      </form>
    </div>
  )
}
