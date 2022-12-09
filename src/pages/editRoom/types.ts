import { TUser } from '../../api/types'

export type TEditRoomForm = {
  users_to_edit: TUser[]
  users_to_add: Omit<TUser, 'id'>[]
  password: string
}
