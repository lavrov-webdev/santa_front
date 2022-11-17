import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TUser} from "../api/types";

export type UsersSlice = {
  loggedUser?: number,
  usersToChoice: TUser[]
}

const initialState:UsersSlice = {
  loggedUser: undefined,
  usersToChoice: []
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<number>) => {
      state.loggedUser = action.payload
    },
    setUsersToChoice: (state, action: PayloadAction<TUser[]>) => {
      state.usersToChoice = action.payload
    }
  }
})


export const {setLoggedUser, setUsersToChoice} = usersSlice.actions
export const {reducer: usersReducer} = usersSlice
