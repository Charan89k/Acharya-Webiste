import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Event } from '@/lib/models/Event'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const events = await Event.find({}).sort({ date: -1 })
    return NextResponse.json(events)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const body = await request.json()
    const newEvent = await Event.create(body)

    await ActivityLog.create({
      action: 'Event created',
      details: `Created event "${newEvent.title}" by admin ${admin.username}`,
    })

    return NextResponse.json(newEvent)
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
    const { id, ...updateData } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true })
    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    await ActivityLog.create({
      action: 'Event edited',
      details: `Updated event "${updatedEvent.title}" by admin ${admin.username}`,
    })

    return NextResponse.json(updatedEvent)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    const deletedEvent = await Event.findByIdAndDelete(id)
    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    await ActivityLog.create({
      action: 'Event deleted',
      details: `Deleted event "${deletedEvent.title}" by admin ${admin.username}`,
    })

    return NextResponse.json({ success: true, message: 'Event deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
