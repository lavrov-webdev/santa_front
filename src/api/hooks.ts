import useAxios from 'axios-hooks'
import {
  CreateRoomPostData,
  CreateRoomRes,
  EditRoomReq,
  GetRoomInfoRes,
  GetString,
  LoginRoomReq,
  LoginRoomRes,
  LoginToEditReq,
  LoginToEditRes,
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
  useAxios<ResType<never>, SelectUserReq>(
    {
      url: 'room/select',
      method: 'put',
    },
    { manual: true }
  )

export const useLoginToEdit = (getRoomId: GetString) =>
  useAxios<LoginToEditRes, LoginToEditReq>(
    {
      url: `room/${getRoomId()}/edit`,
      method: 'post',
    },
    { manual: true }
  )
export const useEditRoom = (getRoomId: GetString) =>
  useAxios<ResType<never>, EditRoomReq>(
    {
      url: `room/${getRoomId()}/edit`,
      method: 'put',
    },
    { manual: true }
  )
