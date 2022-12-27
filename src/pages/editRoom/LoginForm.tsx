import { FC, useState } from 'react'
import { Button, Input, InputGroup } from 'rsuite'
import { useLoginToEdit } from '../../api'
import { joinRoomToEdit } from '../../store/roomSlice'
import { useAppDispatch } from '../../store/store'
import styles from './styles.module.scss'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import { TRequestEditRoomPage } from './types'
import { useSearchParams } from 'react-router-dom'

type LoginFormProps = {
  roomId: string
  setRequestStatus: (newVal: TRequestEditRoomPage | undefined) => void
}

const LoginForm: FC<LoginFormProps> = ({ roomId, setRequestStatus }) => {
  const [searchParams] = useSearchParams()
  const [pass, setPass] = useState<string>(searchParams.get('password') || '')
  const [{ loading }, login] = useLoginToEdit(() => roomId!)
  const dispatch = useAppDispatch()
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

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

  const onPassIconClick = () => {
    setPasswordIsVisible((p) => !p)
  }

  return (
    <>
      <div className={styles.homeTitle}>Введите пароль от комнаты</div>
      <InputGroup inside className={styles.homeInputGroup}>
        <Input
          value={pass}
          type={passwordIsVisible ? 'text' : 'password'}
          onChange={setPass}
        />
        <InputGroup.Button onClick={onPassIconClick}>
          {!passwordIsVisible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
      </InputGroup>
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
