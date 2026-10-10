'use client'
import { useFormLogin } from '@ufopark/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '../molecules/Toast'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        setLoading(true)

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        setLoading(false)

        if (result?.ok) {
          toast('You’re logged in.')
          replace('/')
        }
        if (result?.error) {
          toast(
            'That email and password don’t match. Check them and try again.',
          )
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          type="email"
          autoComplete="email"
          {...register('email')}
          placeholder="you@example.com"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          autoComplete="current-password"
          {...register('password')}
          placeholder="Your password"
        />
      </HtmlLabel>
      <Button type="submit" size="lg" fullWidth loading={loading}>
        Log in
      </Button>
      <p className="text-sm text-fg-muted">
        New to UFO Park?{' '}
        <Link
          href="/register"
          className="font-semibold text-fg underline decoration-primary decoration-2 underline-offset-4 hover:decoration-fg"
        >
          Create an account
        </Link>
      </p>
    </Form>
  )
}
