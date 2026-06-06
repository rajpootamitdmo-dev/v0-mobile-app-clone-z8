'use client'

import { Header } from '@/components/header'
import { BottomNav } from '@/components/bottom-nav'
import PaymentContent from './payment-content'

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0 flex items-center justify-center px-4">
        <PaymentContent />
      </main>

      <BottomNav />
    </div>
  )
}
