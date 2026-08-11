'use server'

import { supabase } from './supabase'
import { ACTIVIDADES, MUNICIPIOS_HIDALGO, RegistroForm } from '@/types/registro'

const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACTIVIDAD_IDS = new Set(ACTIVIDADES.map((a) => a.id))

function generarFolio(): string {
  const prefijo = 'CCJ26'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefijo}-${timestamp}-${random}`
}

function validarRegistro(data: RegistroForm): string | null {
  if (!data.nombre_completo?.trim()) return 'Tu nombre es obligatorio.'
  if (data.nombre_completo.trim().length > 100) return 'El nombre no puede superar 100 caracteres.'

  if (!data.correo?.trim() || !CORREO_REGEX.test(data.correo.trim())) return 'Ingresa un correo válido.'
  if (data.correo.trim().length > 100) return 'El correo no puede superar 100 caracteres.'

  const telefonoLimpio = data.telefono?.replace(/[\s-]/g, '') ?? ''
  if (!/^\d{10}$/.test(telefonoLimpio)) return 'El teléfono debe tener exactamente 10 dígitos.'

  const edadNum = Number(data.edad)
  if (!Number.isInteger(edadNum) || edadNum < 18 || edadNum > 30) return 'Debes tener entre 18 y 30 años.'

  if (!data.municipio?.trim()) return 'Selecciona tu municipio.'
  if (!MUNICIPIOS_HIDALGO.includes(data.municipio.trim())) return 'Municipio no válido.'

  if (!data.institucion?.trim()) return 'Indica tu escuela u organización.'
  if (data.institucion.trim().length > 150) return 'La institución no puede superar 150 caracteres.'

  if (!Array.isArray(data.actividades)) return 'Actividades inválidas.'
  if (data.actividades.some((id) => !ACTIVIDAD_IDS.has(id))) return 'Una de las actividades seleccionadas no es válida.'

  if (data.mensaje && data.mensaje.trim().length > 500) return 'El mensaje no puede superar 500 caracteres.'

  return null
}

export async function enviarRegistro(data: RegistroForm): Promise<{
  success: boolean
  folio?: string
  error?: string
}> {
  try {
    const errorValidacion = validarRegistro(data)
    if (errorValidacion) {
      return { success: false, error: errorValidacion }
    }

    const correoNormalizado = data.correo.trim().toLowerCase()

    const { data: puedeRegistrar, error: rateLimitError } = await supabase.rpc(
      'check_email_rate_limit',
      { p_correo: correoNormalizado }
    )

    if (rateLimitError) {
      console.error('Rate limit RPC error:', rateLimitError)
      return { success: false, error: 'No se pudo completar el registro. Intenta de nuevo.' }
    }

    if (!puedeRegistrar) {
      return { success: false, error: 'Ya existe un registro reciente con este correo.' }
    }

    const folio = generarFolio()

    const { error } = await supabase.from('registros').insert({
      folio,
      nombre_completo: data.nombre_completo.trim(),
      correo: correoNormalizado,
      telefono: data.telefono.trim(),
      edad: Number(data.edad),
      municipio: data.municipio.trim(),
      institucion: data.institucion.trim(),
      actividades: data.actividades,
      asiste_cumbre: data.asiste_cumbre,
      como_te_enteraste: data.como_te_enteraste,
      mensaje: data.mensaje?.trim() || null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: 'No se pudo completar el registro. Intenta de nuevo.' }
    }

    return { success: true, folio }
  } catch (err) {
    console.error('Server action error:', err)
    return { success: false, error: 'Error inesperado. Contacta al equipo de la CCJ.' }
  }
}
