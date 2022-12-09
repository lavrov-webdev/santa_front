import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useProtect } from '../../hooks'
import { useAppSelector } from '../../store/store'
import LoginForm from './LoginForm'
import UsersToEdit from './UsersToEdit'

const EditRoom: FC = () => {
  const { roomId } = useParams()
  const roomToEdit = useAppSelector((state) => state.room.roomToEdit)
  useProtect([() => !roomId], [roomId], '/')

  if (!roomId) {
    return null
  }

  return roomToEdit ? (
    <UsersToEdit roomId={roomId} />
  ) : (
    <LoginForm roomId={roomId} />
  )
}

export default EditRoom
