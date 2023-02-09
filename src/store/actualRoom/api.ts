import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import { GetRoomInfoRes } from '../../api/types'
import { TRejectValueString } from '../types'

type TGetRoomInfoRes = {
  id: string
} & GetRoomInfoRes

export const getRoomInfo = createAsyncThunk<
  TGetRoomInfoRes,
  string,
  TRejectValueString
>('actualRoom/getRoomInfo', async (roomId: string, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<GetRoomInfoRes>(`/room/${roomId}`)
    return { ...data, id: roomId }
  } catch (error) {
    return rejectWithValue(error.response.data.detail)
  }
})
