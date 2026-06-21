import { cookies } from 'next/headers'
import { verifyToken } from './auth'

export async function checkAdminAuth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value

    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    return decoded
  } catch {
    return null
  }
}
