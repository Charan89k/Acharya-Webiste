import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Message } from '@/lib/models/Message'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const messages = await Message.find({}).sort({ date: -1 })
    return NextResponse.json(messages)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const { id, read } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }

    const updatedMessage = await Message.findByIdAndUpdate(id, { read }, { new: true })
    if (!updatedMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json(updatedMessage)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
