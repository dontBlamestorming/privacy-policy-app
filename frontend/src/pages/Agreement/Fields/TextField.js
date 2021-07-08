import React from 'react'

import { Input } from '@material-ui/core'

const TextField = ({ name, value, placeholder, onChange }) => {
  return (
    <Input
      name={name}
      value={value}
      style={{
        fontSize: '1.2rem',
        width: '100%',
        paddingRight: '20%',
      }}
      autoComplete="name"
      disableUnderline
      placeholder={placeholder}
      required
      onChange={onChange}
      inputProps={{ style: { textAlign: 'right' } }}
    />
  )
}

export default TextField
