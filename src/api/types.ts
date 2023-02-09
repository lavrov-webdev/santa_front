export type TUser = {
  id: number
  name: string
}
export type TEditableUser = {
  has_choice: boolean
} & TUser
export type TBaseRoom = {
  roomId?: string
  roomPassword?: string
  cost?: number
}
export type TEditableRoom = {
  users: TEditableUser[]
} & TBaseRoom
export type CreateRoomRes = {
  room_id: string
  room_root_password: string
}
export type CreateRoomReq = {
  users: {
    name: string
  }[]
  cost: number | undefined
}
export type GetRoomInfoRes = {
  users_to_login: TUser[]
  cost?: number
}
export type GetPotentialRecipientsRes = {
  users_to_select: TUser[]
}
export type GetRecipientRes = TUser
export type LoginRoomReq = {
  room_id: string
  user_id: number
}
export type SelectUserReq = {
  room_id: string
  choosing_user_id: number
  selected_user_id: number
}
export type LoginToEditReq = {
  password: string
  roomId: string
}
export type LoginToEditRes = {
  users: TEditableUser[]
  cost?: number
}
export type EditRoomReq = {
  cost?: number
  password: string
  users_to_edit: TUser[]
  users_to_add: Omit<TUser, 'id'>[]
  roomId: string
}
export type GetSelectedUserRes = { name?: string; id?: number }
