import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import { GetRoomInfoRes, TUser } from '../../api/types'

type TGetRoomInfoRes = {
  id: string
} & GetRoomInfoRes['data']

export const getRoomInfo = createAsyncThunk<
  TGetRoomInfoRes | undefined,
  string,
  { rejectValue: string }
>('actualRoom/getRoomInfo', async (roomId: string, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<GetRoomInfoRes>(`/room/${roomId}`)
    if (data.error) {
      rejectWithValue(data.error)
    } else {
      return { ...data.data, id: roomId }
    }
  } catch (error) {
    rejectWithValue(error.message)
  }
})
