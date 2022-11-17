import instance from "./instance"
import { ResType, TUser } from "./types"

const getRoomUsers = async (roomId: string) => {
  const { data } = await instance.get<ResType<{ users_to_login: TUser[] }>>(`/room/${roomId}`)
  return data
}

export default getRoomUsers
