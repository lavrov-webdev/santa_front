import { FC, useState } from 'react'
import { Button, IconButton, Message, Stack, Tooltip, Whisper } from 'rsuite'
import { createEditRoomLink, createRoomLink } from './utils'
import styles from './styles.module.scss'
import { createdRoomActions, useAppDispatch, useAppSelector } from '../../store'
import CopyIcon from '@rsuite/icons/Copy'
import CheckIcon from '@rsuite/icons/Check'

type CreateRoomSuccessProps = {}

const CreateRoomSuccess: FC<CreateRoomSuccessProps> = () => {
  const store = useAppSelector((state) => state.createdRoom)
  const dispatch = useAppDispatch()
  const [isLinkCopied, setIsLinkCopied] = useState(false)

  const clear = () => {
    dispatch(createdRoomActions.clear())
  }

  if (!store.id || !store.adminPassword) return null

  const copyLink = () => {
    navigator.clipboard.writeText(createRoomLink(store.id || ''))
    setIsLinkCopied(true)
    setTimeout(() => setIsLinkCopied(false), 3000)
  }

  return (
    <div>
      <h2>Комната создана!</h2>
      <div className={styles.successLinkText}>
        <div>
          Ссылка для подключения к комнате. Отправьте её всем участникам, чтобы
          они приняли участие в розыгрыше. Если вы тоже принимаете участие в
          розыгрыше, Вам также нужно перейти по ссылке и выбрать, для кого Вы
          будете тайным сантой.
          <Stack spacing={12} style={{ marginTop: '1rem' }}>
            <a
              target="_blank"
              className={styles.successLink}
              href={createRoomLink(store.id)}
            >
              {createRoomLink(store.id)}
            </a>
            <Whisper
              speaker={
                <Tooltip>
                  {isLinkCopied ? 'Ссылка копирована' : 'Копировать'}
                </Tooltip>
              }
            >
              <IconButton
                onClick={copyLink}
                icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
              />
            </Whisper>
          </Stack>
        </div>
        <div>
          А это ссылка для редактирования комнаты. Тут можно будет поменять
          список участников и проверить, кто уже сделал свой выбор.
          <br />
          <b>Не делитесь этой ссылкой - она только для Вас.</b>
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
