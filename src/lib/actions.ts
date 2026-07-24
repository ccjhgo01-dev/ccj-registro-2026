'use server'

import { supabase } from './supabase'
import { RegistroForm } from '@/types/registro'

function generarFolio(): string {
  const prefijo = 'CCJ26'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefijo}-${timestamp}-${random}`
}

export async function enviarRegistro(data: RegistroForm): Promise<{
  success: boolean
  folio?: string
  error?: string
}> {
  try {
    const folio = generarFolio()

    const { error } = await supabase.from('registros').insert({
      folio,
      nombre_completo: data.nombre_completo.trim(),
      correo: data.correo.trim().toLowerCase(),
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
