import { FC, useEffect, useMemo, useState } from 'react'
import { Button, SelectPicker } from 'rsuite'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getRoomInfo,
  useAppDispatch,
  useAppSelector,
  checkRecipient,
  getPotentialRecipients,
} from '../../store'
import { Loader } from '../../components'
import styles from './styles.module.scss'

const Login: FC = () => {
  const { roomId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const actualRoom = useAppSelector((state) => state.actualRoom)
  const account = useAppSelector((state) => state.account)

  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const preparedUsersToLogin = useMemo(
    () =>
      actualRoom.usersToLogin.map((u) => ({
        label: u.name,
        value: u.id,
      })),
    [actualRoom.usersToLogin]
  )

  useEffect(() => {
    dispatch(getRoomInfo(roomId || ''))
  }, [])

  const onLogin = async () => {
    if (!selectedUser) return
    const loginData = {
      user_id: selectedUser,
      room_id: roomId || '',
    }
    const checkRecipientRes = await dispatch(checkRecipient(loginData)).unwrap()
    if (checkRecipientRes.recipient) {
      navigate('/view-selected')
      return
    }
    const getPotentialRecipientsRes = await dispatch(
      getPotentialRecipients(loginData)
    ).unwrap()
    if (getPotentialRecipientsRes) navigate('/select')
  }

  const renderContent = () => {
    if (actualRoom.isLoading || account.isLoading) return <Loader />
    if (actualRoom.errorMessage) {
      return <div className={styles.loginError}>{actualRoom.errorMessage}</div>
    }
    if (account.errorMessage)
      return <div className={styles.loginError}>{account.errorMessage}</div>

    if (actualRoom.usersToLogin && actualRoom.usersToLogin.length > 0) {
      return (
        <div className={styles.loginWrapper}>
          <div className={styles.loginSelectBlock}>
            <span className={styles.loginSubtitle}>
              Выберите себя в списке ниже:{' '}
            </span>
            <SelectPicker
              onChange={setSelectedUser}
              value={selectedUser}
              data={preparedUsersToLogin}
              block
            />
            <Button
              className={styles.loginSelectBlockButton}
              block
              onClick={onLogin}
            >
              Войти
            </Button>
          </div>
        </div>
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
