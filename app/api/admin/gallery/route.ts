import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Gallery } from '@/lib/models/Gallery'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { checkAdminAuth } from '@/lib/auth-check'

export async function GET() {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const items = await Gallery.find({}).sort({ order: 1, addedAt: -1 })
    return NextResponse.json(items)
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
    
    // Find highest order to place at end
    const lastItem = await Gallery.findOne({}).sort({ order: -1 })
    const nextOrder = lastItem && typeof lastItem.order === 'number' ? lastItem.order + 1 : 0
    
    const newItem = await Gallery.create({
      ...body,
      order: nextOrder,
    })

    await ActivityLog.create({
      action: 'Gallery image uploaded',
      details: `Added gallery item "${newItem.name}" by admin ${admin.username}`,
    })

    return NextResponse.json(newItem)
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
      return NextResponse.json({ error: 'Gallery item ID is required' }, { status: 400 })
    }

    const updatedItem = await Gallery.findByIdAndUpdate(id, updateData, { new: true })
    if (!updatedItem) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    return NextResponse.json(updatedItem)
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
      return NextResponse.json({ error: 'Gallery item ID is required' }, { status: 400 })
    }

    const deletedItem = await Gallery.findByIdAndDelete(id)
    if (!deletedItem) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }

    await ActivityLog.create({
      action: 'Gallery image deleted',
      details: `Deleted gallery item "${deletedItem.name}" by admin ${admin.username}`,
    })

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
