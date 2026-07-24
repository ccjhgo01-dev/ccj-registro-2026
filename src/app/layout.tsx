import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CCJ Hidalgo 2026 — Registro Oficial',
  description:
    'Registro oficial para asistir a las actividades de la Cumbre Climática Juvenil Hidalgo 2026. Organizado por CCJ Hidalgo, LCOY México 2026 y REACCIONA.',
  keywords: ['CCJ', 'Hidalgo', 'cumbre climática juvenil', 'medio ambiente', 'juventudes'],
  openGraph: {
    title: 'CCJ Hidalgo 2026 — Regístrate',
    description: 'Sé parte del cambio climático desde Hidalgo. 27 julio – 1° agosto 2026.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
