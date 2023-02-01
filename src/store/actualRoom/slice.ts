import { createSlice } from '@reduxjs/toolkit'
import { TUser } from '../../api/types'
import { TStoreWithErrorAndLoadin } from '../types'
import * as api from './api'

type TActualRoom = {
  cost: number | null
  usersToLogin: TUser[]
  id: string | undefined
} & TStoreWithErrorAndLoadin

const initialState: TActualRoom = {
  cost: null,
  usersToLogin: [],
  isLoading: false,
  id: undefined,
  errorMessage: undefined,
}
export const actualRoom = createSlice({
  name: 'actualRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.getRoomInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false
      if (payload?.users_to_login && payload.users_to_login.length < 1) {
        state.errorMessage = 'В комнате нет пользователей'
      } else {
        state.errorMessage = undefined
        state.usersToLogin = payload?.users_to_login || []
        state.cost = payload?.cost || null
        state.id = payload?.id || undefined
      }
    })
    builder.addCase(api.getRoomInfo.pending, (state) => {
      state.errorMessage = undefined
      state.isLoading = true
    })
    builder.addCase(api.getRoomInfo.rejected, (state, { payload }) => {
      state.errorMessage = payload
      state.isLoading = false
    })
  },
})
