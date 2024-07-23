import { RegisterForm } from '@ufopark/ui/src/components/templates/RegisterForm'
import { AuthLayout } from '@ufopark/ui/src/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Register'}>
      <RegisterForm />
    </AuthLayout>
  )
}
