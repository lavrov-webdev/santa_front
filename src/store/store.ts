import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { account } from './account'
import { actualRoom } from './actualRoom'
import { createdRoom } from './createdRoom'
import { editableRoom } from './editableRoom'
import { AppDispatch, RootState } from './types'

const store = configureStore({
  reducer: {
    actualRoom: actualRoom.reducer,
    account: account.reducer,
    createdRoom: createdRoom.reducer,
    editableRoom: editableRoom.reducer,
  },
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
