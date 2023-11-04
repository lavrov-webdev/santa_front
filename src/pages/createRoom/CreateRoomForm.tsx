import { FC } from 'react'
import { createRoom, useAppDispatch, useAppSelector } from '../../store'
import { useFieldArray, useForm } from 'react-hook-form'
import { CreateRoomFormFields } from './types'
import { uniqueNames } from '../../utils/validation'
import styles from './styles.module.scss'
import {
  CostInput,
  ErrorMessage,
  Title,
  UsersFieldsArray,
} from '../../components'
import { Button, Stack, Tooltip, Whisper } from 'rsuite'
import InfoOutlineIcon from '@rsuite/icons/InfoOutline'

const CreateRoomForm: FC = () => {
  const dispatch = useAppDispatch()
  const createRoomError = useAppSelector(
    (state) => state.createdRoom.errorMessage
  )
  const { handleSubmit, control, formState } = useForm<CreateRoomFormFields>({
    defaultValues: {
      users: [{ name: '' }, { name: '' }, { name: '' }],
    },
  })
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'users',
    rules: {
      validate: uniqueNames,
    },
  })

  const onSubmit = async (values: CreateRoomFormFields) => {
    const dataToReq = {
      users: values.users.map((user) => ({ name: user.name })),
      cost: values.cost ? +values.cost : undefined,
    }
    dispatch(createRoom(dataToReq))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        <Title>Введите список участников:</Title>
        <Whisper
          placement="top"
          controlId="control-id-hover"
          trigger="hover"
          speaker={
            <Tooltip>
              Любой уникальный идентификатор. Имя, полное ФИО, никнейм или что
              угодно
            </Tooltip>
          }
        >
          <InfoOutlineIcon />
        </Whisper>
      </Stack>
      <UsersFieldsArray
        name="users"
        control={control}
        fields={fields}
        append={append}
        remove={remove}
        errors={formState.errors}
      />
      <CostInput
        control={control}
        label="Введите максимальную сумму подарка (не обязательно)"
        error={formState.errors.cost?.message}
      />
      <Button
        appearance="primary"
        type="submit"
        disabled={fields.length < 3}
        loading={formState.isSubmitting}
        block
      >
        Создать комнату
      </Button>
      <ErrorMessage message={createRoomError} className={styles.formError} />
    </form>
  )
}

export default CreateRoomForm
