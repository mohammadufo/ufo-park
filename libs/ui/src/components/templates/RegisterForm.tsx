'use client'
import { Role } from '@ufopark/util/types'
import { useFormRegister } from '@ufopark/forms/src/register'
import { useMutation } from '@apollo/client'
import { RegisterWithCredentialsDocument } from '@ufopark/network/src/gql/generated'
import { Form } from '../atoms/Form'
import { signIn } from 'next-auth/react'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { toast } from '../molecules/Toast'

export interface ISignupFormProps {
  className?: string
  role?: Role
}
export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading, data }] = useMutation(
    RegisterWithCredentialsDocument,
  )

  return (
    <Form
      onSubmit={handleSubmit(async (formData) => {
        const { data, errors } = await registerWithCredentials({
          variables: {
            registerWithCredentialsInput: formData,
          },
        })

        if (errors?.length) {
          toast(`We couldn’t create the account: ${errors[0].message}`)
          return
        }

        if (data) {
          toast('Account created. Logging you in…')
          signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
          })
        }
      })}
    >
      <HtmlLabel title="Your name" error={errors.name?.message}>
        <HtmlInput
          autoComplete="name"
          placeholder="How should we greet you?"
          {...register('name')}
        />
      </HtmlLabel>
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register('email')}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          {...register('password')}
        />
      </HtmlLabel>
      <Button type="submit" size="lg" fullWidth loading={loading}>
        Create account
      </Button>
      <p className="text-sm text-fg-muted">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-fg underline decoration-primary decoration-2 underline-offset-4 hover:decoration-fg"
        >
          Log in
        </Link>
      </p>
    </Form>
  )
}
