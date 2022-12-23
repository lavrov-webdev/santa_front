import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from 'rsuite'
import { useEditRoom } from '../../api'
import { CostInput, Title, UsersFieldsArray } from '../../components'
import { useAppSelector } from '../../store/store'
import { uniqueNames } from '../../utils/validation'
import { TEditRoomForm, TRequestEditRoomPage } from './types'
import styles from './styles.module.scss'

type EditFormProps = {
  setRequestStatus: (newVal: TRequestEditRoomPage | undefined) => void
}

const EditForm: FC<EditFormProps> = ({ setRequestStatus }) => {
  const roomEdit = useAppSelector((state) => state.room.roomToEdit)
  const [{}, editRoom] = useEditRoom(() => roomEdit!.roomId!)
  const { handleSubmit, control, formState, getValues } =
    useForm<TEditRoomForm>({
      defaultValues: {
        users_to_edit: roomEdit!.users,
        cost: roomEdit!.cost,
      },
    })
  const usersToEdit = useFieldArray({
    control,
    name: 'users_to_edit',
    rules: {
      validate: uniqueNames,
    },
  })
  const usersToAdd = useFieldArray({
    control,
    name: 'users_to_add',
    rules: {
      validate: {
        isUnique: uniqueNames,
        uniqueWithEditableUsers: (v) =>
          uniqueNames(
            [...v, ...getValues('users_to_edit')],
            'Имена новых участников не могут пересекаться с именами уже добавленных'
          ),
      },
    },
  })

  const submit = async (values: TEditRoomForm) => {
    setRequestStatus(undefined)
    try {
      const res = await editRoom({
        data: {
          users_to_add: values.users_to_add.map((u) => ({ name: u.name })),
          users_to_edit: values.users_to_edit,
          password: roomEdit!.roomPassword!,
          cost: values.cost ? +values.cost : undefined,
        },
      })
      if (!res.data.error) {
        setRequestStatus({
          type: 'success',
          message: 'Комната успешно отредактирована',
        })
      } else {
        setRequestStatus({
          type: 'error',
          message: res.data.error,
        })
      }
    } catch (e) {
      if (e instanceof Error)
        setRequestStatus({ type: 'error', message: e.message })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={styles.editForm}>
        <div>
          <Title size="m">Текущие участники</Title>
          <UsersFieldsArray
            name="users_to_edit"
            control={control}
            fields={usersToEdit.fields}
            errors={formState.errors}
          />
        </div>
        <div>
          <Title size="m">Добавить новых пользователей</Title>
          <UsersFieldsArray
            name="users_to_add"
            control={control}
            fields={usersToAdd.fields}
            append={usersToAdd.append}
            remove={usersToAdd.remove}
            errors={formState.errors}
          />
        </div>
        <div>
          <CostInput
            error={formState.errors.cost?.message}
            control={control}
            label="Максимальная сумма подарка"
          />
        </div>
        <div>
          <Button
            loading={formState.isSubmitting}
            type="submit"
            appearance="primary"
            block
          >
            Редактировать комнату
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditForm
