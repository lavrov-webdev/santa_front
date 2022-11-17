import instance from "./instance"
import {ResType, TUser} from "./types"

const login = async (roomId: string, userId: number) => {
    const {data} = await instance.post<ResType<{ users_to_select: TUser[] }>>("/room/login", {
        room_id: roomId,
        user_id: userId
    })
    return data
}

export default login
