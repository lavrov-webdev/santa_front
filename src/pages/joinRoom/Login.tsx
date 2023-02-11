import { FC, useEffect } from 'react'
import { Button } from 'rsuite'
import { useParams } from 'react-router-dom'
import {
  getRoomInfo,
  useAppDispatch,
  useAppSelector,
  useLogin,
} from '../../store'
import { ErrorMessage, Loader } from '../../components'
import styles from './styles.module.scss'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { TLoginForm } from './types'
import PasswordField from './PasswordField'
import SelectUser from './SelectUser'

const Login: FC = () => {
  const { roomId } = useParams()
  const dispatch = useAppDispatch()
  const actualRoom = useAppSelector((state) => state.actualRoom)
  const account = useAppSelector((state) => state.account)
  const form = useForm<TLoginForm>({
    defaultValues: {
      userId: null,
      password: '',
    },
  })
  const login = useLogin()
  useWatch({ control: form.control, name: 'userId' })

  useEffect(() => {
    dispatch(getRoomInfo(roomId || ''))
  }, [])

  const isUserHasPassword = !!actualRoom.usersToLogin.find(
    (u) => u.id === form.getValues('userId')
  )?.has_password

  const onLogin = async (data: TLoginForm) => {
    await login(data.userId, isUserHasPassword, data.password, roomId)
  }

  const renderContent = () => {
    if (actualRoom.isLoading) return <Loader />

    if (actualRoom.usersToLogin && actualRoom.usersToLogin.length > 0) {
      return (
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className={styles.loginWrapper}
        >
          <FormProvider {...form}>
            <div className={styles.loginSelectBlock}>
              <span className={styles.loginSubtitle}>
                Выберите себя в списке ниже:
              </span>
              <SelectUser />
              <PasswordField isUserHasPassword={isUserHasPassword} />
              <Button
                className={styles.loginSelectBlockButton}
                type="submit"
                disabled={!form.formState.isValid}
                loading={account.isLoading}
                block
              >
                Войти
              </Button>
            </div>
            <ErrorMessage
              style={{ width: '100%' }}
              message={actualRoom.errorMessage}
            />
            <ErrorMessage
              style={{ width: '100%' }}
              message={account.errorMessage}
            />
          </FormProvider>
        </form>
      )
    } else {
      return (
        <div className={styles.loginError}>
          В этой комнате не осталось не выбравших пользователей
        </div>
      )
    }
  }

  return renderContent()
}

export default Login
