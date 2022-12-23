import { createRoom } from '../../api'
import { CreateRoomPostData } from '../../api/types'
import { useSetRecoilState } from 'recoil'
import { createRoomAtom } from '../../recoilState/roomAtoms'

export default async (users: CreateRoomPostData) => {
  const setCreatedRoom = useSetRecoilState(createRoomAtom)

  const sendReq = async () => {
    const res = await createRoom(users)
  }

  return [sendReq]
}
