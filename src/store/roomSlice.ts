import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RoomSlice = {
  roomId?: string
  roomPassword?: string
}

const initialState: RoomSlice = {
  roomId: undefined,
  roomPassword: undefined
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setCreatedRoom: (_, action: PayloadAction<RoomSlice>) => {
      return action.payload
    },
    setRoomId: (state, action: PayloadAction<string | undefined>) => {
      state.roomId = action.payload
    }
  }
})

export const {setCreatedRoom, setRoomId} = roomSlice.actions
export const {reducer: roomReducer} = roomSlice
