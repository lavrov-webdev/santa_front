import { FC, useMemo } from 'react'
import { SelectPicker } from 'rsuite'
import { Controller, useFormContext } from 'react-hook-form'
import { TLoginForm } from './types'
import { useAppSelector } from '../../store'

const SelectUser: FC = () => {
  const form = useFormContext<TLoginForm>()
  const actualRoom = useAppSelector((state) => state.actualRoom)

  const preparedUsersToLogin = useMemo(
    () =>
      actualRoom.usersToLogin.map((u) => ({
        label: u.name,
        value: u.id,
      })),
    [actualRoom.usersToLogin]
  )

  return (
    <Controller
      name="userId"
      control={form.control}
      rules={{ required: true }}
      render={({ field }) => (
        <SelectPicker data={preparedUsersToLogin} block {...field} />
      )}
    />
  )
}

export default SelectUser
