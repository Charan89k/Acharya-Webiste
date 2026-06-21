import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Member } from '@/lib/models/Member'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const members = await Member.find({}).sort({ joinedAt: -1 })
    return NextResponse.json(members)
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
    const newMember = await Member.create(body)

    await ActivityLog.create({
      action: 'Member created',
      details: `Added new member "${newMember.name}" (${newMember.memberType}) by admin ${admin.username}`,
    })

    return NextResponse.json(newMember)
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
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
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 })
    }

    const updatedMember = await Member.findByIdAndUpdate(id, updateData, { new: true })
    if (!updatedMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    await ActivityLog.create({
      action: 'Member edited',
      details: `Updated member details for "${updatedMember.name}" by admin ${admin.username}`,
    })

    return NextResponse.json(updatedMember)
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
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 })
    }

    const deletedMember = await Member.findByIdAndDelete(id)
    if (!deletedMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    await ActivityLog.create({
      action: 'Member deleted',
      details: `Removed member "${deletedMember.name}" by admin ${admin.username}`,
    })

    return NextResponse.json({ success: true, message: 'Member deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
