import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUser } from '../api/types'

export type RoomSlice = {
  roomId?: string
  roomPassword?: string
  cost?: number
  roomToEdit?: {
    roomId: string
    roomPass: string
    users: TUser[]
  }
}

const initialState: RoomSlice = {
  roomId: undefined,
  roomPassword: undefined,
  cost: undefined,
  roomToEdit: undefined,
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setCreatedRoom: (_, action: PayloadAction<RoomSlice>) => {
      return action.payload
    },
    joinToRoom: (
      state,
      action: PayloadAction<{ roomId: string; cost?: number }>
    ) => {
      state.roomId = action.payload.roomId
      state.cost = action.payload.cost
    },
    joinRoomToEdit: (
      state,
      action: PayloadAction<{
        roomId: string
        users: TUser[]
        roomPass: string
      }>
    ) => {
      state.roomToEdit = { ...action.payload }
    },
  },
})

export const { setCreatedRoom, joinToRoom, joinRoomToEdit } = roomSlice.actions
export const { reducer: roomReducer } = roomSlice
