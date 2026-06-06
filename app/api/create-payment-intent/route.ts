import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || ''
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-01-27.acpi',
}) : null

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const { amount, orderId, email } = await request.json()

    if (!amount || !orderId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'inr',
      receipt_email: email,
      metadata: {
        orderId,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
