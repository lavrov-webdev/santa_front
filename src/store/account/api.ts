import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import {
  GetPotentialRecipientsRes,
  GetRecipientRes,
  LoginRoomReq,
  SelectUserReq,
  TUser,
} from '../../api/types'
import { TRejectValueString } from '../types'

type TCheckRecipientReturn = {
  recipient: TUser | undefined
  id: string
}

export const checkRecipient = createAsyncThunk<
  TCheckRecipientReturn,
  LoginRoomReq
>('account/checkRecipient', async (reqData) => {
  try {
    const { data } = await axiosInstance.get<GetRecipientRes>(`getUserChoice`, {
      params: {
        ...reqData,
      },
    })
    if (data.id && data.name) {
      return {
        recipient: data,
        id: reqData.user_id,
      }
    } else {
      return {
        recipient: undefined,
        id: reqData.user_id,
      }
    }
  } catch {
    return {
      recipient: undefined,
      id: reqData.user_id,
    }
  }
})

type TGetPotentialRecipientsRes = {
  potentialRecipients: TUser[]
  id: string
}

export const getPotentialRecipients = createAsyncThunk<
  TGetPotentialRecipientsRes,
  LoginRoomReq,
  TRejectValueString
>('account/getPotentialRecipients', async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post<GetPotentialRecipientsRes>(
      'room/login',
      {
        ...reqData,
      }
    )
    return {
      potentialRecipients: data.users_to_select,
      id: reqData.user_id,
    }
  } catch (e) {
    return rejectWithValue(e.response.data.detail)
  }
})

export const selectRecipient = createAsyncThunk<
  string,
  SelectUserReq,
  TRejectValueString
>('account/selectRecipient', async (reqData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put('room/select', {
      ...reqData,
    })
    return reqData.selected_user_id
  } catch (e) {
    return rejectWithValue(e.response.data.message)
  }
})
