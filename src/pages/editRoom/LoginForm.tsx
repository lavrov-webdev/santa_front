import { FC, useState } from 'react'
import { Button, Input } from 'rsuite'
import { useLoginToEdit } from '../../api'
import { joinRoomToEdit } from '../../store/roomSlice'
import { useAppDispatch } from '../../store/store'
import styles from './styles.module.scss'
import { TRequestEditRoomPage } from './types'

type LoginFormProps = {
  roomId: string
  setRequestStatus: (newVal: TRequestEditRoomPage | undefined) => void
}

const LoginForm: FC<LoginFormProps> = ({ roomId, setRequestStatus }) => {
  const [pass, setPass] = useState('')
  const [{ loading }, login] = useLoginToEdit(() => roomId!)
  const dispatch = useAppDispatch()

  const sendLoginData = async () => {
    setRequestStatus(undefined)
    try {
      const { data } = await login({ data: { password: pass } })
      if (!data.error) {
        dispatch(
          joinRoomToEdit({
            roomPassword: pass,
            roomId: roomId!,
            users: data.data.users,
            cost: data.data.cost,
          })
        )
      } else {
        setRequestStatus({ type: 'error', message: data.error })
      }
    } catch (e) {
      if (e instanceof Error)
        setRequestStatus({ type: 'error', message: e.message })
    }
  }

  return (
    <>
      <div className={styles.homeTitle}>Введите пароль от комнаты</div>
      <Input
        className={styles.homeInput}
        value={pass}
        type="password"
        onChange={setPass}
      />
      <Button
        loading={loading}
        appearance="primary"
        onClick={sendLoginData}
        block
      >
        Зайти
      </Button>
    </>
  )
}

export default LoginForm
