import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Donation } from '@/lib/models/Donation'

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const { name, email, amount, message } = await request.json()

    if (!name || !email || !amount) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and amount are required' },
        { status: 400 }
      )
    }

    const donation = await Donation.create({
      name,
      email,
      amount: Number(amount),
      message,
      paymentStatus: 'Completed', // Simulating successful payment status
      date: new Date(),
    })

    return NextResponse.json({ success: true, donation })
  } catch (error: any) {
    console.error('Donation submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
