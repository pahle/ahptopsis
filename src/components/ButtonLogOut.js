'use client'

import { logout } from '@/utils/auth'
import React from 'react'

const ButtonLogOut = () => {
  return <button onClick={async () => await logout()}>Log Out</button>
}

export default ButtonLogOut