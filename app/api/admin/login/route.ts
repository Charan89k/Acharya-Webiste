import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Admin } from '@/lib/models/Admin'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const { email: loginInput, password } = await request.json()

    if (!loginInput || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/Username and password are required' },
        { status: 400 }
      )
    }

    // Find admin by username OR email
    const admin = await Admin.findOne({
      $or: [
        { email: loginInput.trim().toLowerCase() },
        { username: loginInput.trim().toLowerCase() }
      ]
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordMatch) {
      // Log failed login attempt
      await ActivityLog.create({
        action: 'Login failed',
        details: `Failed login attempt for identifier: ${loginInput}`,
      })

      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = signToken({
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    })

    // Log successful login
    await ActivityLog.create({
      action: 'Login success',
      details: `Successful login for user: ${admin.username} (${admin.role})`,
    })

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      requirePasswordChange: admin.requirePasswordChange,
      role: admin.role,
      username: admin.username,
    })

    // Set HttpOnly cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    // Set fallback admin_session for simple client checks/middleware
    response.cookies.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
