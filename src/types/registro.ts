export interface Actividad {
  id: string
  dia: number
  fecha: string
  titulo: string
  subtitulo?: string
  ponente?: string
  hora?: string
  confirmada: boolean
}

// Actividades de la Ruta Previa (en línea), previas a la Cumbre oficial de delegadxs
export const ACTIVIDADES: Actividad[] = [
  {
    id: 'act-1',
    dia: 1,
    fecha: '10 de agosto',
    hora: '4:00 pm',
    titulo: '¿Qué es una CCJ? / Liderazgo Ambiental',
    ponente: 'REACCIONA',
    confirmada: true,
  },
  {
    id: 'act-2',
    dia: 2,
    fecha: '11 de agosto',
    hora: '6:00 pm',
    titulo: '¿A tiempo para salvarla? Análisis de Riesgo para Chiropterotriton mosaueri',
    ponente: 'Biól. Maria Karime Marin Carbajal',
    confirmada: true,
  },
  {
    id: 'act-3',
    dia: 3,
    fecha: '12 de agosto',
    hora: '7:00 pm',
    titulo: 'La ciencia no es sólo para científicos',
    ponente: 'Biól. Andrea Calvo Rodríguez',
    confirmada: true,
  },
  {
    id: 'act-4',
    dia: 4,
    fecha: '19 de agosto',
    hora: '6:00 pm',
    titulo: 'La Conservación de la Biodiversidad Desde la Colectividad',
    ponente: 'M. en C. Nallely Morales Capellán',
    confirmada: true,
  },
  {
    id: 'act-5',
    dia: 5,
    fecha: 'Por confirmar',
    titulo: 'Watergram',
    ponente: 'Iván Razo',
    confirmada: false,
  },
  {
    id: 'act-6',
    dia: 6,
    fecha: 'Por confirmar',
    titulo: '¿Qué es la NDC 3.0?',
    ponente: 'SEMARNAT',
    confirmada: false,
  },
]

export const CUMBRE_DIAS = [
  { fecha: '27 de agosto', label: 'Día 1 de la Cumbre' },
  { fecha: '28 de agosto', label: 'Día 2 de la Cumbre' },
]

export interface RegistroForm {
  nombre_completo: string
  correo: string
  telefono: string
  edad: number | ''
  municipio: string
  institucion: string
  actividades: string[]
  asiste_cumbre: boolean
  como_te_enteraste: string
  mensaje?: string
}

export interface RegistroRecord extends RegistroForm {
  id: string
  folio: string
  created_at: string
  edad: number
}
