import { LoginForm } from '@ufopark/ui/src/components/templates/LoginForm'
import { AuthLayout } from '@ufopark/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}
