import React from 'react'

import { Input } from '@material-ui/core'

const TextField = ({ name, value, placeholder, onChange }) => {
  return (
    <Input
      name={name}
      value={value}
      style={{ fontSize: '1.375rem' }}
      autoComplete="name"
      disableUnderline
      placeholder={placeholder}
      required
      onChange={onChange}
    />
  )
}

export default TextField
