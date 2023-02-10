import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import LoginForm from './LoginForm'
import EditForm from './EditForm'
import styles from './styles.module.scss'
import { ErrorMessage } from '../../components'
import { Message } from 'rsuite'

const EditRoom: FC = () => {
  const { roomId } = useParams()
  const editableRoom = useAppSelector((state) => state.editableRoom)

  return (
    <div className={styles.wrapper}>
      {editableRoom.id === roomId ? (
        <EditForm roomId={roomId || ''} />
      ) : (
        <LoginForm roomId={roomId || ''} />
      )}
      <ErrorMessage
        message={editableRoom.errorMessage}
        className={styles.homeReqStatus}
      />
    </div>
  )
}

export default EditRoom
