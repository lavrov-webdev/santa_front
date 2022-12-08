import useAxios from 'axios-hooks'
import {
  CreateRoomPostData,
  CreateRoomRes,
  GetRoomInfoRes,
  LoginRoomReq,
  LoginRoomRes,
  ResType,
  SelectUserReq,
} from './types'

export const useLogin = () =>
  useAxios<LoginRoomRes, LoginRoomReq>(
    {
      url: 'room/login',
      method: 'post',
    },
    { manual: true }
  )

export const useGetRoomInfo = (getRoomId: () => string) =>
  useAxios<GetRoomInfoRes>({
    url: `room/${getRoomId()}`,
  })

export const useCreateRoom = () =>
  useAxios<CreateRoomRes, CreateRoomPostData>(
    {
      method: 'post',
      url: 'room/create',
    },
    { manual: true }
  )

export const useSelectUser = () =>
  useAxios<ResType<any>, SelectUserReq>(
    {
      url: 'room/select',
      method: 'put',
    },
    { manual: true }
  )
