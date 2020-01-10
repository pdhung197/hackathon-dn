import React, { ReactElement } from 'react'
import useForm from 'react-hook-form'

const Form = ({ defaultValues, children, onSubmit }: any): ReactElement => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
              : child
          })
        : children}
    </form>
  )
}

export default Form
