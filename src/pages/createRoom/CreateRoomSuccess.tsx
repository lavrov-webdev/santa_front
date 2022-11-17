import React, {FC} from 'react'
import {Message} from 'rsuite'
import {createRoomLink} from './utils'
import {useAppSelector} from "../../store/store";
import {useProtect} from "../../hooks";
import styles from './styles.module.scss'

type CreateRoomSuccessProps = {}

const CreateRoomSuccess: FC<CreateRoomSuccessProps> = () => {
  const store = useAppSelector(state => state.room)
  const protect = () => !store.roomId || !store.roomPassword
  useProtect([protect], [store], "/create-room")

  return (
    <div>
      <h2>Комната созадана!</h2>
      <div className={styles.linkText}>
        Ссылка для подключения к комнате <a target="_blank"
                                            href={createRoomLink(store.roomId!)}>{createRoomLink(store.roomId!)}</a>
      </div>
      <Message className='text-lg mt-10' type="error">
        Запомните этот пароль, он понадобится, чтобы редактировать комнату: <b>{store.roomPassword!}</b>
      </Message>
    </div>
  )
}

export default CreateRoomSuccess;
