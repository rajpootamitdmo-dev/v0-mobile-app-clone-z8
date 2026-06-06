'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [orderId, setOrderId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const clientSecret = searchParams.get('clientSecret')
    const orderId = searchParams.get('orderId')

    if (!clientSecret || !orderId) {
      setStatus('error')
      return
    }

    setOrderId(orderId)

    // Simulate payment processing
    // In a real app, you'd use Stripe's client library to confirm payment
    const processPayment = async () => {
      try {
        // Update order status to completed
        const { error } = await supabase
          .from('orders')
          .update({ status: 'completed' })
          .eq('id', orderId)

        if (error) {
          setStatus('error')
          return
        }

        // Clear cart
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('cart_items').delete().eq('user_id', user.id)
        }

        setStatus('success')
      } catch (error) {
        console.error('Error processing payment:', error)
        setStatus('error')
      }
    }

    // Simulate a 2 second processing time
    const timer = setTimeout(processPayment, 2000)
    return () => clearTimeout(timer)
  }, [searchParams, supabase])

  return (
    <div className="max-w-md w-full text-center space-y-6">
      {status === 'processing' && (
        <>
          <div className="flex justify-center">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Processing Payment
          </h1>
          <p className="text-muted-foreground">
            Please wait while we process your payment...
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            Your order {orderId} has been placed successfully. You&apos;ll
            receive a confirmation email shortly.
          </p>
          <div className="space-y-2 pt-4">
            <Link
              href={`/orders/${orderId}`}
              className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Order Details
            </Link>
            <Link
              href="/"
              className="block w-full px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="flex justify-center">
            <AlertCircle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Payment Failed
          </h1>
          <p className="text-muted-foreground">
            There was an issue processing your payment. Please try again.
          </p>
          <Link
            href="/checkout"
            className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </Link>
        </>
      )}
    </div>
  )
}

export default function PaymentContentWrapper() {
  return (
    <Suspense fallback={<div className="max-w-md w-full text-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
