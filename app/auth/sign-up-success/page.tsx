'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function SignUpSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <CheckCircle2 className="w-24 h-24 text-primary relative" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Waste2Worth!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your account has been created successfully.
          </p>
        </div>

        {/* Message */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <p className="text-foreground font-medium">
            Check your email to verify your account
          </p>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent you a verification link. Please check your inbox and click the link to confirm your email address.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-4">
          <p className="text-sm text-muted-foreground">
            Redirecting to home in a moment...
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Home
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex gap-4 justify-center text-sm pt-4">
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Back to Login
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/auth/sign-up"
            className="text-muted-foreground hover:text-foreground"
          >
            Create Another Account
          </Link>
        </div>
      </div>
    </div>
  )
}
