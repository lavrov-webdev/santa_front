import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type RoomSlice = {
  roomId?: string
  roomPassword?: string
  cost?: number
}

const initialState: RoomSlice = {
  roomId: undefined,
  roomPassword: undefined,
  cost: undefined,
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
  },
})

export const { setCreatedRoom, joinToRoom } = roomSlice.actions
export const { reducer: roomReducer } = roomSlice
