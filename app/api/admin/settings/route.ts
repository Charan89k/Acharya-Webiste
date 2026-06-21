import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Settings } from '@/lib/models/Settings'
import { ActivityLog } from '@/lib/models/ActivityLog'
import { checkAdminAuth } from '@/lib/auth-check'

export async function PUT(request: Request) {
  const admin = await checkAdminAuth()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectToDatabase()
    const updateData = await request.json()
    
    let settings = await Settings.findOne({})
    if (!settings) {
      settings = await Settings.create(updateData)
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, updateData, { new: true })
    }

    await ActivityLog.create({
      action: 'Settings updated',
      details: `Organization details updated by admin ${admin.username}`,
    })

    return NextResponse.json(settings)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
