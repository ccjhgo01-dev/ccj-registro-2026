'use client'

import { Fragment, useMemo, useState } from 'react'
import { ACTIVIDADES, RegistroRecord } from '@/types/registro'

const ACTIVIDAD_TITULOS = new Map(ACTIVIDADES.map((a) => [a.id, a.titulo]))
const CUMBRE_VALUE = '__cumbre__'

function formatFecha(iso: string): string {
  return new Date(iso).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })
}

export default function AdminRegistrosTable({ registros }: { registros: RegistroRecord[] }) {
  const [busqueda, setBusqueda] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [actividad, setActividad] = useState('')
  const [expandido, setExpandido] = useState<string | null>(null)

  const municipios = useMemo(
    () => Array.from(new Set(registros.map((r) => r.municipio))).sort(),
    [registros]
  )

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return registros.filter((r) => {
      if (q) {
        const enTexto =
          r.nombre_completo.toLowerCase().includes(q) ||
          r.correo.toLowerCase().includes(q) ||
          r.folio.toLowerCase().includes(q) ||
          r.institucion.toLowerCase().includes(q)
        if (!enTexto) return false
      }
      if (municipio && r.municipio !== municipio) return false
      if (actividad === CUMBRE_VALUE && !r.asiste_cumbre) return false
      if (actividad && actividad !== CUMBRE_VALUE && !r.actividades.includes(actividad)) return false
      return true
    })
  }, [registros, busqueda, municipio, actividad])

  const hayFiltros = Boolean(busqueda || municipio || actividad)

  function limpiarFiltros() {
    setBusqueda('')
    setMunicipio('')
    setActividad('')
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-dorado/20 p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[220px]">
          <label htmlFor="busqueda" className="block text-verde-oscuro font-semibold text-xs mb-1">
            Buscar
          </label>
          <input
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Nombre, correo, folio, institución..."
            className="w-full bg-crema border border-dorado/30 rounded-lg px-3 py-2 text-sm text-tierra-oscuro outline-none focus:border-verde-olivo transition-colors"
          />
        </div>
        <div>
          <label htmlFor="filtro-municipio" className="block text-verde-oscuro font-semibold text-xs mb-1">
            Municipio
          </label>
          <select
            id="filtro-municipio"
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className="bg-crema border border-dorado/30 rounded-lg px-3 py-2 text-sm text-tierra-oscuro outline-none focus:border-verde-olivo transition-colors"
          >
            <option value="">Todos los municipios</option>
            {municipios.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filtro-actividad" className="block text-verde-oscuro font-semibold text-xs mb-1">
            Actividad
          </label>
          <select
            id="filtro-actividad"
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
            className="bg-crema border border-dorado/30 rounded-lg px-3 py-2 text-sm text-tierra-oscuro outline-none focus:border-verde-olivo transition-colors"
          >
            <option value="">Todas las actividades</option>
            <option value={CUMBRE_VALUE}>Cumbre de Delegadxs</option>
            {ACTIVIDADES.map((a) => (
              <option key={a.id} value={a.id}>{a.titulo}</option>
            ))}
          </select>
        </div>
        {hayFiltros && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="text-tierra/70 hover:text-tierra text-sm font-semibold px-3 py-2"
          >
            Limpiar filtros
          </button>
        )}
        <div className="ml-auto text-sm text-tierra/70 self-center whitespace-nowrap">
          {filtrados.length} de {registros.length} registros
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-dorado/20">
        <table className="w-full text-sm text-left">
          <thead className="bg-beige text-verde-oscuro">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Folio</th>
              <th className="px-4 py-3 whitespace-nowrap">Nombre</th>
              <th className="px-4 py-3 whitespace-nowrap">Contacto</th>
              <th className="px-4 py-3 whitespace-nowrap">Municipio</th>
              <th className="px-4 py-3">Actividades</th>
              <th className="px-4 py-3 whitespace-nowrap">Cumbre</th>
              <th className="px-4 py-3 whitespace-nowrap">Fecha</th>
              <th className="px-4 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody className="divide-y divide-dorado/10">
            {filtrados.map((r) => {
              const abierto = expandido === r.id
              return (
                <Fragment key={r.id}>
                  <tr
                    onClick={() => setExpandido(abierto ? null : r.id)}
                    className="hover:bg-beige/40 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-semibold text-verde-oscuro whitespace-nowrap">{r.folio}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.nombre_completo}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div>{r.correo}</div>
                      <div className="text-tierra/60 text-xs">{r.telefono}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.municipio}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {r.actividades.length === 0 && <span className="text-tierra/40">—</span>}
                        {r.actividades.map((id) => (
                          <span
                            key={id}
                            className="bg-verde-olivo/10 text-verde-oscuro text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                          >
                            {ACTIVIDAD_TITULOS.get(id) ?? id}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.asiste_cumbre ? (
                        <span className="bg-verde-olivo text-crema text-xs px-2 py-0.5 rounded-full font-semibold">
                          Sí
                        </span>
                      ) : (
                        <span className="text-tierra/40 text-xs">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-tierra/70">{formatFecha(r.created_at)}</td>
                    <td className="px-4 py-3 text-tierra/40 text-xs">{abierto ? '▲' : '▼'}</td>
                  </tr>
                  {abierto && (
                    <tr className="bg-beige/30">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="grid sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-verde-oscuro">Edad:</span> {r.edad}
                          </div>
                          <div>
                            <span className="font-semibold text-verde-oscuro">Institución:</span> {r.institucion}
                          </div>
                          <div>
                            <span className="font-semibold text-verde-oscuro">¿Cómo se enteró?:</span>{' '}
                            {r.como_te_enteraste}
                          </div>
                        </div>
                        {r.mensaje && (
                          <div className="mt-3 text-sm">
                            <span className="font-semibold text-verde-oscuro">Mensaje:</span>
                            <p className="text-tierra-oscuro mt-1 whitespace-pre-wrap">{r.mensaje}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-tierra/60">
                  Ningún registro coincide con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
