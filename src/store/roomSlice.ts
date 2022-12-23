import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBaseRoom, TEditableRoom } from '../api/types'

export type RoomSlice = {
  roomToEdit?: TEditableRoom
} & TBaseRoom

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
    joinRoomToEdit: (state, action: PayloadAction<TEditableRoom>) => {
      state.roomToEdit = { ...action.payload }
    },
  },
})

export const { setCreatedRoom, joinToRoom, joinRoomToEdit } = roomSlice.actions
export const { reducer: roomReducer } = roomSlice
