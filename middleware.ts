import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'acharya-super-secret-key-12345'
)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  const { pathname } = request.nextUrl

  const isDashboard = pathname.startsWith('/admin/dashboard')
  const isLoginPage = pathname === '/admin'

  let authenticated = false

  if (token) {
    try {
      await jose.jwtVerify(token, JWT_SECRET)
      authenticated = true
    } catch (err) {
      // Token invalid or expired
    }
  }

  // If trying to access dashboard but not authenticated, redirect to login
  if (isDashboard && !authenticated) {
    const response = NextResponse.redirect(new URL('/admin', request.url))
    response.cookies.delete('admin_token')
    response.cookies.delete('admin_session')
    return response
  }

  // If already authenticated and trying to access login page, redirect to dashboard
  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
}
