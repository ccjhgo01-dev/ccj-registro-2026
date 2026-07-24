import Link from 'next/link'
import Image from 'next/image'
import { ACTIVIDADES } from '@/types/registro'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ───────── NAVBAR ───────── */}
      <nav className="sticky top-0 z-50 bg-verde-oscuro/95 backdrop-blur-sm shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
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
        {/* Fondo decorativo con formas orgánicas */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-dorado blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cielo blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-dorado/20 border border-dorado/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-dorado-claro animate-pulse" />
                <span className="text-dorado-claro text-sm font-semibold">Registro Oficial 2026</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl text-blanco leading-tight mb-4">
                ¡La espera <span className="text-dorado-claro">terminó!</span>
              </h1>

              <p className="text-crema/80 text-lg leading-relaxed mb-8">
                La <strong className="text-crema">Cumbre Climática Juvenil Hidalgo 2026</strong> ya tiene fechas,
                actividades y un espacio para tu voz.
                Regístrate para asistir a los eventos pre-cumbre y la cumbre oficial de delegadxs.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/registro"
                  className="inline-block bg-dorado hover:bg-dorado-claro text-tierra-oscuro font-display font-semibold text-lg px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  ¡Regístrate ahora!
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
                  { label: 'Pre-cumbre', value: '27–30 julio' },
                  { label: 'Cumbre Delegadxs', value: '31 jul – 1° ago' },
                  { label: 'Hidalgo', value: 'Estado anfitrión' },
                ].map((item) => (
                  <div key={item.label} className="bg-blanco/10 rounded-xl px-4 py-2">
                    <p className="text-crema/60 text-xs">{item.label}</p>
                    <p className="text-crema font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mascota oficial CCJ — foto real del material de campaña */}
            <div className="flex justify-center items-end">
              <div className="mascot-float relative w-72 h-80 md:w-80 md:h-96 rounded-[2rem] overflow-hidden border-4 border-dorado/60 shadow-2xl rotate-2">
                <Image
                  src="/images/mascota-hero.jpeg"
                  alt="Mascota oficial CCJ Hidalgo 2026, la salamandra, registrando su ingreso a la cumbre"
                  fill
                  sizes="(min-width: 768px) 320px, 288px"
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
            <path d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 L0,60 Z" fill="#F5F0E8"/>
          </svg>
        </div>
      </section>

      {/* ───────── REQUISITOS ───────── */}
      <section className="py-14 bg-crema">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl text-verde-oscuro text-center mb-10">
            ¿Quién puede participar?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🎂',
                titulo: '18 a 29 años',
                desc: 'El espacio está diseñado para juventudes en ese rango de edad.',
              },
              {
                icon: '📍',
                titulo: 'Hidalguense o residente',
                desc: 'Ser del estado o haber vivido en Hidalgo al menos el último año.',
              },
              {
                icon: '🌱',
                titulo: 'Ganas de cambiar',
                desc: 'Querer ser un factor de cambio ambiental en tu comunidad.',
              },
            ].map((req) => (
              <div
                key={req.titulo}
                className="bg-beige rounded-2xl p-6 border border-dorado/20 text-center"
              >
                <div className="text-4xl mb-3">{req.icon}</div>
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
      <section id="actividades" className="py-14 bg-beige paper-texture">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-dorado font-semibold text-sm uppercase tracking-widest mb-2">Programa</p>
            <h2 className="font-display text-3xl text-verde-oscuro">Actividades pre-cumbre</h2>
            <p className="text-tierra mt-2">Cada sesión dura 40 min + 5 min tolerancia + 5 min extras</p>
          </div>

          <div className="space-y-4">
            {ACTIVIDADES.map((act) => (
              <div
                key={act.id}
                className="bg-crema rounded-2xl p-5 border border-dorado/20 flex gap-4 items-start"
              >
                {/* Día badge */}
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
                  {act.subtitulo && (
                    <p className="text-tierra text-sm mt-0.5">{act.subtitulo}</p>
                  )}
                  {act.ponente && (
                    <p className="text-tierra/70 text-sm mt-1 italic">{act.ponente}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cumbre principal */}
          <div className="mt-8 bg-verde-oscuro text-crema rounded-2xl p-6">
            <div className="flex gap-4 items-center">
              <div className="shrink-0 text-4xl">🏔️</div>
              <div>
                <p className="text-dorado-claro font-display font-semibold text-xl">
                  Cumbre Oficial para Delegadxs
                </p>
                <p className="text-crema/80 text-sm mt-1">
                  31 de julio y 1° de agosto — El encuentro central donde se construyen propuestas
                  de posicionamiento juvenil frente a la crisis climática de Hidalgo.
                </p>
              </div>
            </div>
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
            Ir al formulario de registro →
          </Link>
          <p className="mt-6 text-tierra/60 text-sm">
            Co-organizado por <strong>CCJ Hidalgo</strong> · <strong>LCOY México 2026</strong> · <strong>REACCIONA A.C.</strong>
          </p>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="bg-tierra-oscuro py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
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
