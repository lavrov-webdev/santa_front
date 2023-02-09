import { FC } from 'react'
import { useAppSelector } from '../../store'
import { CreateRoomSuccess } from './index'
import CreateRoomForm from './CreateRoomForm'

const CreateRoom: FC = () => {
  const createdRoom = useAppSelector((state) => state.createdRoom)

  const isRoomCreated = !!createdRoom.id && !!createdRoom.adminPassword

  if (isRoomCreated) return <CreateRoomSuccess />
  return <CreateRoomForm />
}

export default CreateRoom
