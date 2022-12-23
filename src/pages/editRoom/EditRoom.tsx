import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProtect } from '../../hooks'
import { useAppSelector } from '../../store/store'
import LoginForm from './LoginForm'
import EditForm from './EditForm'
import styles from './styles.module.scss'
import { ErrorMessage } from '../../components'
import { Message } from 'rsuite'
import { TRequestEditRoomPage } from './types'

const EditRoom: FC = () => {
  const { roomId } = useParams()
  const roomToEdit = useAppSelector((state) => state.room.roomToEdit)
  const [requestStatus, setRequestStatus] = useState<
    TRequestEditRoomPage | undefined
  >()
  useProtect([() => !roomId], [roomId], '/')

  if (!roomId) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      {roomToEdit ? (
        <EditForm setRequestStatus={setRequestStatus} />
      ) : (
        <LoginForm setRequestStatus={setRequestStatus} roomId={roomId} />
      )}
      <ErrorMessage
        message={
          requestStatus?.type === 'error' ? requestStatus?.message : undefined
        }
        className={styles.homeReqStatus}
      />
      {requestStatus?.type === 'success' && (
        <Message className={styles.homeReqStatus}>
          {requestStatus.message}
        </Message>
      )}
    </div>
  )
}

export default EditRoom
