import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../api'
import {
  GetPotentialRecipientsRes,
  GetRecipientRes,
  LoginRoomReq,
  ResType,
  SelectUserReq,
  TUser,
} from '../../api/types'

type TCheckRecipientReturn = {
  recipient: TUser | undefined
  id: number
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
    return {
      recipient: data.data,
      id: reqData.user_id,
    }
  } catch {
    return {
      recipient: undefined,
      id: reqData.user_id,
    }
  }
})

export const getPotentialRecipients = createAsyncThunk(
  'account/getPotentialRecipients',
  async (reqData: LoginRoomReq, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<GetPotentialRecipientsRes>(
        'room/login',
        {
          ...reqData,
        }
      )
      if (data.error) {
        rejectWithValue(data.error)
      }
      return {
        potentialRecipients: data.data.users_to_select,
        id: reqData.user_id,
      }
    } catch (e) {
      if (e instanceof Error) rejectWithValue(e.message)
    }
  }
)

export const selectRecipient = createAsyncThunk<
  number | undefined,
  SelectUserReq,
  {
    rejectValue: string
  }
>(
  'account/selectRecipient',
  async (reqData: SelectUserReq, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<ResType<never>>('room/select', {
        ...reqData,
      })
      if (data.error) return rejectWithValue(data.error)
      return reqData.selected_user_id
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message)
    }
  }
)
