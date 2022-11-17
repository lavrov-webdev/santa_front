import {configureStore} from "@reduxjs/toolkit";
import {roomReducer} from "./roomSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {usersReducer} from "./usersSlice";


const store = configureStore({
  reducer: {
    room: roomReducer,
    users: usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch //

export default store
