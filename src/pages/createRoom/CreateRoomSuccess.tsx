import { FC } from 'react'
import { Message } from 'rsuite'
import { createEditRoomLink, createRoomLink } from './utils'
import styles from './styles.module.scss'
import { useAppSelector } from '../../store'
import { LinkButton } from '../../components'

type CreateRoomSuccessProps = {}

const CreateRoomSuccess: FC<CreateRoomSuccessProps> = () => {
  const store = useAppSelector((state) => state.createdRoom)

  if (!store.id || !store.adminPassword) {
    return (
      <div className={styles.successEmptyRoom}>
        <h2>Вы пока не создали комнату</h2>
        <LinkButton appearance="primary" size="lg" block to="/create-room/">
          Создать
        </LinkButton>
      </div>
    )
  }

  return (
    <div>
      <h2>Комната создана!</h2>
      <div className={styles.successLinkText}>
        <div>
          Ссылка для подключения к комнате
          <a
            target="_blank"
            className={styles.successLink}
            href={createRoomLink(store.id)}
          >
            {createRoomLink(store.id)}
          </a>
        </div>
        <div>
          А также ссылка для её редактирования
          <a
            target="_blank"
            className={styles.successLink}
            href={createEditRoomLink(store.id, store.adminPassword)}
          >
            {createEditRoomLink(store.id, store.adminPassword)}
          </a>
        </div>
      </div>
      <Message className={styles.successPasswordBlock} type="info">
        <div className={styles.successPasswordBlockText}>
          Запомните этот пароль, он понадобится, чтобы редактировать комнату:{' '}
          <b>{store.adminPassword}</b>
        </div>
      </Message>
    </div>
  )
}

export default CreateRoomSuccess
