import { Metadata } from 'next'
import { LoginForm } from '@ufopark/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@ufopark/ui/src/components/molecules/AuthLayout'

export const metadata: Metadata = { title: 'Log in' }

export default function Page() {
  return (
    <AuthLayout
      title="Log in"
      subtitle="Welcome back. Your bookings and passcodes are waiting."
    >
      <LoginForm />
    </AuthLayout>
  )
}
