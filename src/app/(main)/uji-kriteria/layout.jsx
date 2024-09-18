import React from 'react'

const UjiKriteria = ({ children }) => {
  if (cookies().get('role') == !'admin') {
    redirect('/')
  }

  return <div>{children}</div>
}

export default UjiKriteria
