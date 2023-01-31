import { createSlice } from '@reduxjs/toolkit'
import { TUser } from '../../api/types'
import { TStoreWithErrorAndLoadin } from '../types'
import * as api from './api'

type TEditableRoom = {
  users: TUser[]
  cost: number | null
  id: string | undefined
  password: string | undefined
  isRoomEdited: boolean
} & TStoreWithErrorAndLoadin

const initialState: TEditableRoom = {
  users: [],
  cost: null,
  id: undefined,
  isRoomEdited: false,
  password: undefined,
  isLoading: false,
  errorMessage: undefined,
}

export const editableRoom = createSlice({
  name: 'editableRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.loginToEditRoom.pending, () => ({
      ...initialState,
      isLoading: true,
    }))
    builder.addCase(api.loginToEditRoom.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errorMessage = undefined
      state.id = payload?.id
      state.users = payload?.users || []
      state.cost = payload?.cost || null
      state.password = payload?.password || undefined
    })
    builder.addCase(api.loginToEditRoom.rejected, (state, { payload }) => {
      state.errorMessage = payload as string
    })

    builder.addCase(api.editRoom.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(api.editRoom.fulfilled, (state) => {
      state.isRoomEdited = true
    })
    builder.addCase(api.editRoom.rejected, (state, { payload }) => {
      state.errorMessage = payload as string
    })
  },
})
