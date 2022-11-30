export type ResType<T> = {
  error: null | string,
  data: T
}
export type TUser = {
  id: number,
  name: string
}
export type CreateRoomRes = ResType<{
  room_id: string,
  room_root_password: string
}>
export type CreateRoomPostData = {
  users: {
    name: string
  }[]
}
export type GetRoomInfoRes = ResType<{
  users_to_login: TUser[],
  cost?: number
}>
export type LoginRoomRes = ResType<{
  users_to_select: TUser[],
  selected_user?: TUser
}>
