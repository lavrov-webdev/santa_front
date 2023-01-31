import { FC, useState } from 'react'
import { Button, Input, InputGroup } from 'rsuite'
import styles from './styles.module.scss'
import EyeIcon from '@rsuite/icons/legacy/Eye'
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { loginToEditRoom } from '../../store'

type LoginFormProps = {
  roomId: string
}

const LoginForm: FC<LoginFormProps> = ({ roomId }) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState<string>(
    searchParams.get('password') || ''
  )
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const loading = useAppSelector((state) => state.editableRoom.isLoading)

  const sendLoginData = async () => {
    dispatch(
      loginToEditRoom({
        roomId,
        password,
      })
    )
  }

  const onPassIconClick = () => {
    setPasswordIsVisible((p) => !p)
  }

  return (
    <>
      <div className={styles.homeTitle}>Введите пароль от комнаты</div>
      <InputGroup inside className={styles.homeInputGroup}>
        <Input
          value={password}
          type={passwordIsVisible ? 'text' : 'password'}
          onChange={setPassword}
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
