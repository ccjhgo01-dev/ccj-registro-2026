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

export const ACTIVIDADES: Actividad[] = [
  {
    id: 'act-1',
    dia: 1,
    fecha: '27 de julio',
    titulo: 'Taller Liderazgo Ambiental — REACCIONA',
    subtitulo: '¿Qué es una CCJ?',
    confirmada: true,
  },
  {
    id: 'act-2',
    dia: 2,
    fecha: '28 de julio',
    titulo: 'Plática: Salamandra pie plano de caverna',
    ponente: 'Biol. Maria Karime Marin',
    confirmada: true,
  },
  {
    id: 'act-3',
    dia: 3,
    fecha: '29 de julio',
    hora: '6:00 pm',
    titulo: 'Xplora Reptilia',
    confirmada: true,
  },
  {
    id: 'act-4',
    dia: 4,
    fecha: '29 de julio',
    hora: '7:00 pm',
    titulo: 'El Papel de las Juventudes en la Divulgación Científica',
    ponente: 'Biol. Andrea Calvo',
    confirmada: true,
  },
  {
    id: 'act-5',
    dia: 5,
    fecha: '30 de julio',
    titulo: 'Comunidades Regeneración',
    ponente: 'Mafer Skewes — Rhesident A.C.',
    confirmada: false,
  },
]

export const CUMBRE_DIAS = [
  { fecha: '31 de julio', label: 'Día 1 de la Cumbre' },
  { fecha: '1° de agosto', label: 'Día 2 de la Cumbre' },
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
