import { createSlice } from '@reduxjs/toolkit'
import { TStoreWithErrorAndLoadin } from '../types'
import * as api from './api'

type TCreatedRoom = {
  id: string | undefined
  adminPassword: string | undefined
  link: string | undefined
} & TStoreWithErrorAndLoadin

const initialState: TCreatedRoom = {
  id: undefined,
  adminPassword: undefined,
  link: undefined,
  errorMessage: undefined,
  isLoading: false,
}

export const createdRoom = createSlice({
  name: 'createdRoom',
  initialState,
  reducers: {
    clear: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder.addCase(api.createRoom.fulfilled, (state, { payload }) => {
      state.id = payload.room_id
      state.adminPassword = payload.room_root_password
      state.isLoading = false
      state.errorMessage = undefined
    })
    builder.addCase(api.createRoom.pending, (state) => {
      state.errorMessage = undefined
      state.isLoading = true
    })
    builder.addCase(api.createRoom.rejected, (state, { payload }) => {
      state.id = '1'
      state.adminPassword = 'p'
      state.isLoading = false
      state.errorMessage = undefined
      // state.isLoading = false
      // state.errorMessage = payload
    })
  },
})

export const createdRoomActions = createdRoom.actions
