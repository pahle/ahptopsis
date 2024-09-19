import React from 'react'

const UjiKriteria = ({ children }) => {
  if (cookies().get('session').value ==! 'admin') {
    redirect('/')
  }

  return <div>{children}</div>
}

export default UjiKriteria
