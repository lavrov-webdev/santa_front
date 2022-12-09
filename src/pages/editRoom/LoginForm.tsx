import { FC, useState } from 'react'
import { Button, Input } from 'rsuite'
import { useLoginToEdit } from '../../api/hooks'
import { joinRoomToEdit } from '../../store/roomSlice'
import { useAppDispatch } from '../../store/store'
import styles from './styles.module.scss'

type LoginFormProps = {
  roomId: string
}

const LoginForm: FC<LoginFormProps> = ({ roomId }) => {
  const [pass, setPass] = useState('')
  const [_, login] = useLoginToEdit(() => roomId!)
  const dispatch = useAppDispatch()

  const sendLoginData = async () => {
    try {
      const { data } = await login({ data: { password: pass } })
      if (!data.error) {
        dispatch(
          joinRoomToEdit({
            roomPass: pass,
            roomId: roomId!,
            users: data.data.users,
          })
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.homeTitle}>Введите пароль от комнаты</div>
      <Input className={styles.homeInput} value={pass} onChange={setPass} />
      <Button block appearance="primary" onClick={sendLoginData}>
        Зайти
      </Button>
    </div>
  )
}

export default LoginForm
