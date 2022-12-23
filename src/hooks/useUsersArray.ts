import { cloneDeep } from 'lodash'
import { useReducer, useState } from 'react'
import { TUser } from '../api/types'

const useUsersArray = (defaultValue: TUser[]) => {
  const maxId = defaultValue.reduce((prev, user) => {
    return Math.max(prev, user.id)
  }, 0)

  const [count, incCount] = useReducer((p) => p + 1, maxId + 1)
  const [value, setValue] = useState<TUser[]>(cloneDeep(defaultValue))
  const pushToArray = () => {
    setValue((p) => [...p, { name: '', id: count }])
    incCount()
  }
  const removeById = (id: number) => {
    setValue((p) => p.filter((p) => p.id !== id))
  }
  const editField = (id: number, newName: string) => {
    setValue((p) => {
      const editedUser = p.find((p) => p.id === id)
      if (!editedUser) return p
      editedUser.name = newName
      return [...p]
    })
  }
  return { value, pushToArray, removeById, editField }
}

export default useUsersArray
export type UseUsersArrayReturn = ReturnType<typeof useUsersArray>
