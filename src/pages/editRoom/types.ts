import { TEditableUser, TUser } from '../../api/types'

export type TEditRoomForm = {
  users_to_edit: TEditableUser[]
  users_to_add: Omit<TUser, 'id'>[]
  cost?: number
}

export type TRequestEditRoomPage = {
  type: 'success' | 'error'
  message: string
}
