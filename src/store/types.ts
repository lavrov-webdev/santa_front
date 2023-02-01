import { store } from '.'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type TStoreWithErrorAndLoadin = {
  errorMessage: string | undefined
  isLoading: boolean
}

export type TRejectValueString = {
  rejectValue: string
}
