import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import {
  EditRoomReq,
  LoginToEditReq,
  LoginToEditRes,
  ResType,
} from '../../api/types'

export const loginToEditRoom = createAsyncThunk(
  'editableRoom/loginToEditRoom',
  async (reqData: LoginToEditReq, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<LoginToEditRes>(
        `room/${reqData.roomId}/edit`,
        {
          password: reqData.password,
        }
      )
      if (data.error) {
        rejectWithValue(data.error)
      } else {
        return { ...data.data, id: reqData.roomId, password: reqData.password }
      }
    } catch (e) {
      rejectWithValue(e.message)
    }
  }
)

export const editRoom = createAsyncThunk(
  'editableRoom/editRoom',
  async (newRoom: EditRoomReq, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<ResType<never>>(
        `room/${newRoom.roomId}/edit`,
        {
          cost: newRoom.cost,
          password: newRoom.password,
          users_to_edit: newRoom.users_to_edit,
          users_to_add: newRoom.users_to_add,
        }
      )
      if (data.error) {
        return rejectWithValue(data.error)
      }
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)
