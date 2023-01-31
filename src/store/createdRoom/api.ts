import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import { CreateRoomReq, CreateRoomRes } from '../../api/types'

export const createRoom = createAsyncThunk(
  'createdRoom/createRoom',
  async (reqData: CreateRoomReq, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<CreateRoomRes>('room/create', {
        ...reqData,
      })
      if (data.error) {
        return rejectWithValue(data.error)
      } else {
        return data.data
      }
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)
