import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE_NAME, getExpectedAdminToken } from '@/lib/adminAuth'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value
  const expected = await getExpectedAdminToken().catch(() => null)

  if (!expected || cookie !== expected) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/registros/:path*'],
}
