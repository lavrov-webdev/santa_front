import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button, Notification, useToaster } from 'rsuite'
import { CostInput, Title, UsersFieldsArray } from '../../components'
import { uniqueNames } from '../../utils/validation'
import { TEditRoomForm } from './types'
import styles from './styles.module.scss'
import { editRoom, useAppDispatch, useAppSelector } from '../../store'

type TEditRoomProps = {
  roomId: string
}

const EditForm: FC<TEditRoomProps> = ({ roomId }) => {
  const editableRoom = useAppSelector((state) => state.editableRoom)
  const dispatch = useAppDispatch()
  const toast = useToaster()
  const { handleSubmit, control, formState, getValues, setValue } =
    useForm<TEditRoomForm>({
      defaultValues: {
        users_to_edit: editableRoom.users,
        cost: editableRoom.cost,
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

  const successMessage = (
    <>
      <Notification type="success" header="Отлично!" closable>
        Комната успешно отредактирована
      </Notification>
    </>
  )

  const submit = async (values: TEditRoomForm) => {
    await dispatch(
      editRoom({
        users_to_add: values.users_to_add.map((u) => ({ name: u.name })),
        users_to_edit: values.users_to_edit,
        password: editableRoom.password || '',
        cost: values.cost ? +values.cost : undefined,
        roomId,
      })
    )
      .unwrap()
      .then((d) => {
        setValue('users_to_add', [])
        setValue('users_to_edit', d.users)
        setValue('cost', d.cost || null)
        toast.push(successMessage, { placement: 'topCenter' })
      })
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
            hasChoisen
          />
        </div>
        <div>
          <Title style={{ marginBottom: '1rem' }} size="m">
            Добавить новых пользователей
          </Title>
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
