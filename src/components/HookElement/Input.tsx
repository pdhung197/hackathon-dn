import React, { ReactElement } from 'react'

const Input = ({ register, name, ...rest }: any): ReactElement => {
  return <input name={name} ref={register} {...rest} />
}

export default Input
