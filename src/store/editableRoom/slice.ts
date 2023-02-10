import { createSlice } from '@reduxjs/toolkit'
import { TEditableUser } from '../../api/types'
import { isPendingAction, isRejectedAction } from '../../utils/matchers'
import { TStoreWithErrorAndLoadin } from '../types'
import * as api from './api'

type TEditableRoom = {
  users: TEditableUser[]
  cost: number | null
  id: string | undefined
  password: string | undefined
} & TStoreWithErrorAndLoadin

const initialState: TEditableRoom = {
  users: [],
  cost: null,
  id: undefined,
  password: undefined,
  isLoading: false,
  errorMessage: undefined,
}

export const editableRoom = createSlice({
  name: 'editableRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.loginToEditRoom.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errorMessage = undefined
      state.id = payload.id
      state.users = payload.users
      state.cost = payload.cost || null
      state.password = payload.password
    })
    builder.addCase(api.editRoom.fulfilled, (state, { payload }) => {
      state.errorMessage = undefined
      state.users = payload.users
      state.cost = payload.cost || null
    })
    builder.addMatcher(isPendingAction('editableRoom'), (state) => {
      state.isLoading = true
      state.errorMessage = undefined
    })
    builder.addMatcher(
      isRejectedAction('editableRoom'),
      (state, { payload }) => {
        state.isLoading = false
        state.errorMessage = payload
      }
    )
  },
})
