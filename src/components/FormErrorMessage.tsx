import React, { FC, HTMLProps } from 'react'
import { Message, MessageProps } from 'rsuite'
import { ErrorMessage } from 'formik'

type FormErrorMessageProps = {
  name: string
} & MessageProps

const FormErrorMessage: FC<FormErrorMessageProps> = ({
  name,
  className,
  ...rest
}) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => (
        <Message className={className} type="error" {...rest}>
          {msg}
        </Message>
      )}
    </ErrorMessage>
  )
}

export default FormErrorMessage
