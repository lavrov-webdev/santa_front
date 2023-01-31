import { AnyAction } from '@reduxjs/toolkit'
import { PendingAction } from '@reduxjs/toolkit/dist/query/core/buildThunks'

export function isPendingAction(slice: string) {
  return function (action: AnyAction): action is PendingAction<any, any> {
    return action.type.endsWith('/pending') && action.type.startsWith(slice)
  }
}
export function isRejectedAction(slice: string) {
  return function (action: AnyAction): action is PendingAction<any, any> {
    return action.type.endsWith('/rejected') && action.type.startsWith(slice)
  }
}
