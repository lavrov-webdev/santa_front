export type ResType<T> = {
  error: null | string,
  data: T
}
export type TUser = {
  id: number,
  name: string
}
export type CreateRoomRes = {
  room_id: string,
  room_root_password: string
}
export type CreateRoomPostData = {
  users: {
    name: string
  }[]
}
