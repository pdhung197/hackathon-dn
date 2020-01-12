import React from 'react'

const FormItem = ({ label, children, type = 'text', ...otherProps }: any) => (
  <div>
    {type === 'text' ? (
      <>
        <label>{label}</label>
        <input type={type} {...otherProps} />
      </>
    ) : (
      <>
        <label />
        <input type={type} {...otherProps} />
        {label}
      </>
    )}
  </div>
)

export default FormItem
