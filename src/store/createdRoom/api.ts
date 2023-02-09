import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import { CreateRoomReq, CreateRoomRes } from '../../api/types'
import { TRejectValueString } from '../types'

export const createRoom = createAsyncThunk<
  CreateRoomRes,
  CreateRoomReq,
  TRejectValueString
>('createdRoom/createRoom', async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<CreateRoomRes>('room/create', {
      ...reqData,
    })
    return data
  } catch (e) {
    return rejectWithValue(e.response.data.detail)
  }
})
