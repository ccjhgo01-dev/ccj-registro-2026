import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLoginForm from '@/components/AdminLoginForm'
import { ADMIN_COOKIE_NAME, getExpectedAdminToken } from '@/lib/adminAuth'

export const metadata = { title: 'Admin — CCJ Hidalgo 2026' }

export default async function AdminLoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  if (token && process.env.ADMIN_PASSWORD) {
    const expected = await getExpectedAdminToken()
    if (token === expected) {
      redirect('/admin/registros')
    }
  }

  return (
    <main className="min-h-screen bg-verde-oscuro flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-crema rounded-3xl p-8">
        <h1 className="font-display text-2xl text-verde-oscuro mb-1">Panel de administración</h1>
        <p className="text-tierra text-sm mb-6">CCJ Hidalgo 2026 — acceso restringido</p>
        <AdminLoginForm />
      </div>
    </main>
  )
}
