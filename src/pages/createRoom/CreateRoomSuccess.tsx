import { FC } from 'react'
import { Message } from 'rsuite'
import { createEditRoomLink, createRoomLink } from './utils'
import { useAppSelector } from '../../store/store'
import { useProtect } from '../../hooks'
import styles from './styles.module.scss'

type CreateRoomSuccessProps = {}

const CreateRoomSuccess: FC<CreateRoomSuccessProps> = () => {
  const store = useAppSelector((state) => state.room)
  const protect = () => !store.roomId || !store.roomPassword
  useProtect([protect], [store], '/create-room')

  return (
    <div>
      <h2>Комната создана!</h2>
      <div className={styles.successLinkText}>
        <div>
          Ссылка для подключения к комнате
          <a
            target="_blank"
            className={styles.successLink}
            href={createRoomLink(store.roomId!)}
          >
            {createRoomLink(store.roomId!)}
          </a>
        </div>
        <div>
          А также ссылка для её редактирования
          <a
            target="_blank"
            className={styles.successLink}
            href={createEditRoomLink(store.roomId!, store.roomPassword!)}
          >
            {createEditRoomLink(store.roomId!, store.roomPassword!)}
          </a>
        </div>
      </div>
      <Message className={styles.successPasswordBlock} type="info">
        <div className={styles.successPasswordBlockText}>
          Запомните этот пароль, он понадобится, чтобы редактировать комнату:{' '}
          <b>{store.roomPassword!}</b>
        </div>
      </Message>
    </div>
  )
}

export default CreateRoomSuccess
