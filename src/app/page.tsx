import Link from 'next/link'
import Image from 'next/image'
import ModalPatrocinador from '@/components/ModalPatrocinador'
import { ACTIVIDADES } from '@/types/registro'

const CONTAINER = 'max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'

const ACTIVIDADES_IZQ = ACTIVIDADES.filter((a) => a.dia <= 3)
const ACTIVIDADES_DER = ACTIVIDADES.filter((a) => a.dia > 3)

const PATROCINIO_SLIDES = [
  {
    src: '/images/carrusel-convocatoria.jpeg',
    alt: 'La espera terminó — convocatoria para delegadxs de la CCJ Hidalgo 2026',
  },
  {
    src: '/images/carrusel-requisitos.jpeg',
    alt: 'Requisitos para participar en la CCJ Hidalgo 2026: tener de 18 a 30 años',
  },
  {
    src: '/images/carrusel-patrocinador.jpeg',
    alt: '¿Quieres ser delegadx de la CCJ Hidalgo 2026?',
  },
  {
    src: '/images/carrusel-ayuda.jpeg',
    alt: 'Toda ayuda cuenta — patrocinios en efectivo o en especie',
  },
]

const REQUISITOS = [
  {
    numero: '01',
    titulo: '18 a 30 años',
    desc: 'El espacio está diseñado para juventudes en ese rango de edad.',
  },
  {
    numero: '02',
    titulo: 'Hidalguense o residente',
    desc: 'Ser del estado o haber vivido en Hidalgo al menos el último año.',
  },
  {
    numero: '03',
    titulo: 'Ganas de cambiar',
    desc: 'Querer ser un factor de cambio ambiental en tu comunidad.',
  },
]

function ActividadCard({ act }: { act: (typeof ACTIVIDADES)[number] }) {
  return (
    <div className="bg-crema rounded-2xl p-5 border border-dorado/20 flex gap-4 items-start">
      <div className="shrink-0 w-14 h-14 rounded-xl bg-verde-olivo flex flex-col items-center justify-center text-blanco">
        <span className="text-xs opacity-70">Día</span>
        <span className="font-display font-bold text-xl leading-none">{act.dia}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-dorado font-semibold text-sm">{act.fecha}</span>
          {act.hora && (
            <span className="bg-dorado/15 text-dorado text-xs px-2 py-0.5 rounded-full">
              {act.hora}
            </span>
          )}
          {!act.confirmada && (
            <span className="bg-tierra/10 text-tierra text-xs px-2 py-0.5 rounded-full">
              Por confirmar
            </span>
          )}
        </div>
        <h3 className="font-display text-verde-oscuro font-semibold text-lg leading-snug">
          {act.titulo}
        </h3>
        {act.subtitulo && <p className="text-tierra text-sm mt-0.5">{act.subtitulo}</p>}
        {act.ponente && <p className="text-tierra/70 text-sm mt-1 italic">{act.ponente}</p>}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ───────── NAVBAR ───────── */}
      <nav className="sticky top-0 z-50 bg-verde-oscuro/95 backdrop-blur-sm shadow-md">
        <div className={`${CONTAINER} py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="bg-crema rounded-lg px-2.5 py-1.5 shadow-sm">
              <Image
                src="/images/logo-ccj.jpeg"
                alt="CCJ Hidalgo — Cumbres Climáticas Juveniles"
                width={1600}
                height={809}
                priority
                className="h-8 w-auto md:h-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-crema/60 text-xs">Co-organizado con</span>
            <span className="text-dorado text-xs font-semibold">LCOY MX 2026</span>
            <span className="text-crema/40">·</span>
            <span className="text-dorado text-xs font-semibold">REACCIONA</span>
          </div>
        </div>
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="relative bg-verde-oscuro overflow-hidden paper-texture">
        {/* Elemento geométrico diagonal — rompe el fondo liso */}
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 h-full w-2/3 bg-verde-olivo/20"
            style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 8% 100%)' }}
          />
          <div
            className="absolute top-0 right-0 h-full w-2/3 bg-dorado-claro/70"
            style={{ clipPath: 'polygon(37.5% 0, 39% 0, 12% 100%, 10.5% 100%)' }}
          />
        </div>

        <div className={`relative ${CONTAINER} py-12 sm:py-16 lg:py-24`}>
          <div className="flex flex-col lg:grid lg:grid-cols-[55%_45%] lg:items-center gap-10 lg:gap-14">
            {/* Texto */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-dorado/20 border border-dorado/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-dorado-claro animate-pulse" />
                <span className="text-dorado-claro text-sm font-semibold">Registro Oficial 2026</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-blanco leading-[1.05] mb-5">
                Tu voz es <span className="text-dorado-claro">acción climática</span>
              </h1>

              <p className="text-crema/80 text-lg leading-relaxed mb-8 max-w-xl">
                La <strong className="text-crema">Cumbre Climática Juvenil Hidalgo 2026</strong> ya tiene fechas,
                actividades y un espacio para tu voz.
                Regístrate para asistir a los eventos de la Ruta Previa y la cumbre oficial de delegadxs.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/registro"
                  className="inline-block bg-dorado hover:bg-dorado-claro text-tierra-oscuro font-display font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Regístrate ahora
                </Link>
                <a
                  href="#actividades"
                  className="inline-block border-2 border-crema/40 hover:border-crema text-crema font-semibold text-lg px-8 py-3.5 rounded-2xl transition-colors duration-200"
                >
                  Ver programa
                </a>
              </div>

              {/* Fechas clave */}
              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  { label: 'Ruta Previa', value: '10-19 agosto' },
                  { label: 'Cumbre Delegadxs', value: '27-28 agosto' },
                  { label: 'Hidalgo', value: 'Estado anfitrión' },
                ].map((item) => (
                  <div key={item.label} className="bg-blanco/10 rounded-xl px-4 py-2">
                    <p className="text-crema/60 text-xs">{item.label}</p>
                    <p className="text-crema font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mascota oficial CCJ — foto real, sin tarjeta, que respire */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="mascot-float relative w-64 sm:w-80 lg:w-full lg:max-w-[440px] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/mascota-hero.jpeg"
                  alt="Mascota oficial CCJ Hidalgo 2026, la salamandra, registrando su ingreso a la cumbre"
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 320px, 256px"
                  className="object-cover"
                  style={{ objectPosition: '50% 68%' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Borde inferior ondulado */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 L0,60 Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* ───────── REQUISITOS ───────── */}
      <section className="py-14 lg:py-20 bg-crema">
        <div className={CONTAINER}>
          <h2 className="font-display text-3xl text-verde-oscuro text-center mb-10">
            ¿Quién puede participar?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:divide-x lg:divide-dorado/25">
            {REQUISITOS.map((req) => (
              <div key={req.numero} className="bg-beige lg:bg-transparent rounded-2xl lg:rounded-none border border-dorado/20 lg:border-none p-6 lg:px-8 lg:py-2 text-center lg:text-left">
                <p className="font-display font-bold text-6xl text-verde-olivo/25 leading-none mb-3">
                  {req.numero}
                </p>
                <h3 className="font-display text-verde-oscuro font-semibold text-lg mb-2">
                  {req.titulo}
                </h3>
                <p className="text-tierra text-sm leading-relaxed">{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PROGRAMA / ACTIVIDADES ───────── */}
      <section id="actividades" className="py-14 lg:py-20 bg-beige paper-texture">
        <div className={CONTAINER}>
          <div className="text-center mb-10">
            <p className="text-dorado font-semibold text-sm uppercase tracking-widest mb-2">Programa</p>
            <h2 className="font-display text-3xl text-verde-oscuro">Actividades de la Ruta Previa</h2>
            <p className="text-tierra mt-2">Cada sesión dura 40 min + 5 min tolerancia + 5 min extras</p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Columna izquierda — días 1 a 3 */}
            <div className="space-y-4">
              {ACTIVIDADES_IZQ.map((act) => (
                <ActividadCard key={act.id} act={act} />
              ))}
            </div>

            {/* Columna derecha — días 4, 5 + cumbre */}
            <div className="space-y-4 mt-4 lg:mt-0">
              {ACTIVIDADES_DER.map((act) => (
                <ActividadCard key={act.id} act={act} />
              ))}

              {/* Cumbre principal */}
              <div className="bg-verde-oscuro text-crema rounded-2xl p-6">
                <div className="flex gap-4 items-center">
                  <div className="shrink-0 w-10 h-10 bg-dorado-claro rotate-45 rounded-md" aria-hidden />
                  <div>
                    <p className="text-dorado-claro font-display font-semibold text-xl">
                      Cumbre Oficial para Delegadxs
                    </p>
                    <p className="text-crema/80 text-sm mt-1">
                      27 y 28 de agosto — El encuentro central donde se construyen propuestas
                      de posicionamiento juvenil frente a la crisis climática de Hidalgo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PATROCINADORES ───────── */}
      <section className="py-14 lg:py-20 bg-verde-oscuro paper-texture">
        <div className={CONTAINER}>
          <div className="text-center mb-10">
            <p className="text-dorado font-semibold text-sm uppercase tracking-widest mb-2">Alianzas</p>
            <h2 className="font-display text-3xl lg:text-4xl text-crema mb-3">
              ¿Quieres apoyar la CCJ Hidalgo?
            </h2>
            <p className="text-crema/70 max-w-xl mx-auto mb-6">
              Tu marca u organización puede sumarse como patrocinador y ser parte del cambio climático
              juvenil en Hidalgo.
            </p>
            <ModalPatrocinador />
          </div>

          {/* Carrusel — imágenes oficiales del material CCJ, scroll-snap nativo */}
          <div className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {PATROCINIO_SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                id={`patrocinio-slide-${i}`}
                className="shrink-0 snap-center scroll-ml-4 w-[85%] sm:w-[calc(50%-10px)]"
              >
                <div className="relative h-[340px] bg-tierra-oscuro rounded-2xl overflow-hidden">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 85vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de posición — anclas CSS puro, sin JS */}
          <div className="flex justify-center gap-2 mt-5">
            {PATROCINIO_SLIDES.map((slide, i) => (
              <a
                key={slide.src}
                href={`#patrocinio-slide-${i}`}
                aria-label={`Ir a imagen ${i + 1} de ${PATROCINIO_SLIDES.length}`}
                className="w-2.5 h-2.5 rounded-full bg-crema/30 hover:bg-dorado transition-colors"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-16 bg-crema">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl text-verde-oscuro mb-4">
            ¿List@ para sumar tu voz?
          </h2>
          <p className="text-tierra mb-8 text-lg">
            El registro es gratuito. Cupos limitados por actividad.
          </p>
          <Link
            href="/registro"
            className="inline-block bg-verde-olivo hover:bg-verde-oscuro text-crema font-display font-semibold text-xl px-10 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Ir al formulario de registro
          </Link>
          <p className="mt-6 text-tierra/60 text-sm">
            Co-organizado por <strong>CCJ Hidalgo</strong> · <strong>LCOY México 2026</strong> · <strong>REACCIONA A.C.</strong>
          </p>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="bg-tierra-oscuro py-8">
        <div className={`${CONTAINER} text-center`}>
          <p className="text-crema/50 text-sm">
            © 2026 CCJ Hidalgo — Cumbres Climáticas Juveniles
          </p>
          <p className="text-crema/30 text-xs mt-1">
            Contacto: ccjhgo01@gmail.com
          </p>
        </div>
      </footer>
    </main>
  )
}
