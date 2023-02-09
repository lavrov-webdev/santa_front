import { FC } from 'react'
import { Button, Message } from 'rsuite'
import { createEditRoomLink, createRoomLink } from './utils'
import styles from './styles.module.scss'
import { createdRoomActions, useAppDispatch, useAppSelector } from '../../store'

type CreateRoomSuccessProps = {}

const CreateRoomSuccess: FC<CreateRoomSuccessProps> = () => {
  const store = useAppSelector((state) => state.createdRoom)
  const dispatch = useAppDispatch()

  const clear = () => {
    dispatch(createdRoomActions.clear())
  }

  if (!store.id || !store.adminPassword) return null

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
      <Button
        className={styles.successBackButton}
        appearance="ghost"
        size="lg"
        onClick={clear}
      >
        Создать новую комнату
      </Button>
    </div>
  )
}

export default CreateRoomSuccess
