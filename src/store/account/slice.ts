import { createSlice } from '@reduxjs/toolkit'
import { shuffle } from 'lodash'
import { TUser } from '../../api/types'
import { isPendingAction, isRejectedAction } from '../../utils/matchers'
import { TStoreWithErrorAndLoadin } from '../types'
import * as api from './api'

type TAccount = {
  potentialRecipients: TUser[]
  recipient: TUser | undefined
  id: string | null
  password: string | undefined
} & TStoreWithErrorAndLoadin

const initialState: TAccount = {
  potentialRecipients: [],
  recipient: undefined,
  id: null,
  password: undefined,
  isLoading: false,
  errorMessage: undefined,
}

export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(api.checkRecipient.fulfilled, (state, action) => {
      state.errorMessage = undefined
      state.isLoading = false
      state.recipient = action.payload.recipient
      state.id = action.payload.id
    })
    builder.addCase(
      api.getPotentialRecipients.fulfilled,
      (state, { payload }) => {
        state.isLoading = false
        state.errorMessage = undefined
        state.potentialRecipients = shuffle(payload.potentialRecipients)
        state.id = payload.id
      }
    )
    builder.addCase(api.selectRecipient.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.errorMessage = undefined
      state.recipient = state.potentialRecipients.find((r) => r.id === payload)
    })
    builder.addMatcher(isPendingAction('account'), (state) => {
      state.isLoading = true
      state.errorMessage = undefined
    })
    builder.addMatcher(isRejectedAction('account'), (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload
    })
  },
})
