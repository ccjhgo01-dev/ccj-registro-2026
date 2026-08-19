'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE_NAME, getExpectedAdminToken } from './adminAuth'

export type AdminLoginState = { error?: string }

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const password = String(formData.get('password') ?? '')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Contraseña incorrecta.' }
  }

  const token = await getExpectedAdminToken()
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 horas
  })

  redirect('/admin/registros')
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  redirect('/admin')
}
