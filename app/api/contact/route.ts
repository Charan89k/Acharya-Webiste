import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Message } from '@/lib/models/Message'

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
      date: new Date(),
      read: false,
    })

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error: any) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
