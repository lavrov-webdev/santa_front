import { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TLoginForm } from './types'
import { ErrorMessage } from '../../components'
import { Input, InputGroup } from 'rsuite'
import styles from './styles.module.scss'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'

type TPasswordFieldProps = {
  isUserHasPassword: boolean
}

const PasswordField: FC<TPasswordFieldProps> = ({ isUserHasPassword }) => {
  const form = useFormContext<TLoginForm>()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const type = isPasswordVisible ? 'text' : 'password'
  const icon = isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />
  const toggleIsVisible = () => setIsPasswordVisible((p) => !p)
  return (
    <div className={styles.passwordWrapper}>
      <div>
        {isUserHasPassword
          ? 'Введите пароль, который вы установили при первом входе'
          : 'При первом входе необходимо установить пароль'}
      </div>
      <div className={styles.passwordInput}>
        <Controller
          control={form.control}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'Введите пароль',
            },
          }}
          render={({ field }) => (
            <InputGroup inside>
              <Input type={type} {...field} />
              <InputGroup.Button onClick={toggleIsVisible}>
                {icon}
              </InputGroup.Button>
            </InputGroup>
          )}
        />
      </div>
      <ErrorMessage message={form.formState.errors.password?.message} />
    </div>
  )
}

export default PasswordField
