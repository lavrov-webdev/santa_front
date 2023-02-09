import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import { EditRoomReq, LoginToEditReq, LoginToEditRes } from '../../api/types'
import { TRejectValueString } from '../types'

type TLogingToEditRoomRes = LoginToEditRes & {
  id: string
  password: string
}

export const loginToEditRoom = createAsyncThunk<
  TLogingToEditRoomRes,
  LoginToEditReq,
  TRejectValueString
>('editableRoom/loginToEditRoom', async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<LoginToEditRes>(
      `room/${reqData.roomId}/edit`,
      {
        password: reqData.password,
      }
    )
    return { ...data, id: reqData.roomId, password: reqData.password }
  } catch (e) {
    console.log(e)
    return rejectWithValue(e.response.data.detail)
  }
})

export const editRoom = createAsyncThunk<
  undefined,
  EditRoomReq,
  TRejectValueString
>('editableRoom/editRoom', async (newRoom, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put(`room/${newRoom.roomId}/edit`, {
      cost: newRoom.cost,
      password: newRoom.password,
      users_to_edit: newRoom.users_to_edit,
      users_to_add: newRoom.users_to_add,
    })
  } catch (e) {
    return rejectWithValue(e.response.data.detail)
  }
})
