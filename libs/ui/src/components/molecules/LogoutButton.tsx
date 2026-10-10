'use client'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { Button } from '../atoms/Button'

export const LogoutButton = () => {
  return (
    <Button
      variant="outlined"
      color="black"
      fullWidth
      onClick={() => {
        signOut()
      }}
    >
      <IconLogout className="h-4 w-4" /> Log out
    </Button>
  )
}
