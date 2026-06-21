import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'acharya-super-secret-key-12345'

export function signToken(payload: { id: string; username: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string }
  } catch (err) {
    return null
  }
}
