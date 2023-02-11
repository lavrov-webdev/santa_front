import { TEditableUser, TUser } from '../../api/types'

export type TEditRoomForm = {
  users_to_edit: TEditableUser[]
  users_to_add: Omit<TUser, 'id' | 'has_password'>[]
  cost: number | null
}

export type TRequestEditRoomPage = {
  type: 'success' | 'error'
  message: string
}
