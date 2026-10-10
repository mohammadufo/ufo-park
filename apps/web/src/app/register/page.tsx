import { Metadata } from 'next'
import { RegisterForm } from '@ufopark/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@ufopark/ui/src/components/molecules/AuthLayout'

export const metadata: Metadata = { title: 'Create your account' }

export default function Page() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Book garage slots and valets in a couple of taps."
    >
      <RegisterForm />
    </AuthLayout>
  )
}
