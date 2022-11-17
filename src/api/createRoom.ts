import instance from "./instance"
import {CreateRoomPostData, CreateRoomRes, ResType} from "./types"

const createRoom = async (dataToReq: CreateRoomPostData) => {
  const { data } = await instance.post<ResType<CreateRoomRes>>("/room/create", dataToReq)
  return data
}

export default createRoom
