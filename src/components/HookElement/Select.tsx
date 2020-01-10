import React, { ReactElement } from 'react'

const Select = ({ register, options, name, ...rest }: any): ReactElement => {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map(
        (value: any): ReactElement => (
          <option value={value}>{value}</option>
        ),
      )}
    </select>
  )
}

export default Select
