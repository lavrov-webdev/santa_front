import { FieldArray, Form, Formik, useFormik } from 'formik'
import { FC } from 'react'
import { Input } from 'rsuite'
import { useProtect } from '../../hooks'
import { useAppSelector } from '../../store/store'
import { TEditRoomForm } from './types'

type UsersToEditProps = {
  roomId: string
}

const UsersToEdit: FC<UsersToEditProps> = ({ roomId }) => {
  const roomToEdit = useAppSelector((state) => state.room.roomToEdit)
  useProtect([() => !roomToEdit], [roomToEdit], '/')

  const submitHandler = (formData: TEditRoomForm) => {
    console.log(formData)
  }

  const formik = useFormik<TEditRoomForm>({
    initialValues: {
      password: roomToEdit!.roomPass,
      users_to_edit: [],
      users_to_add: [],
    },
    onSubmit: submitHandler,
  })

  if (!roomToEdit) return null

  return (
    <div>
      <FieldArray
        name="users_to_edit"
        render={(arrayHelpers) => (
          <div>
            {formik.values.users_to_edit.map((editUser) => (
              <div>
                <Input
                  value={editUser.name}
                  onChange={(_, e) => formik.handleChange(e)}
                  name={`users_to_edit.${editUser.id}`}
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}

export default UsersToEdit
