import React from 'react'
import { cookies } from 'next/headers'

const UjiKriteria = ({ children }) => {
  if (cookies().get('session').value ==! 'admin') {
    redirect('/')
  }

  return <div>{children}</div>
}

export default UjiKriteria
