import { TUser } from '../../api/types'

export type CreateRoomFormFields = {
  users: Omit<TUser, 'id'>[]
  cost?: number
}
