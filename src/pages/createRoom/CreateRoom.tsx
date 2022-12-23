import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'rsuite'
import { useAppDispatch } from '../../store/store'
import { setCreatedRoom } from '../../store/roomSlice'
import styles from './styles.module.scss'
import {
  CostInput,
  ErrorMessage,
  Title,
  UsersFieldsArray,
} from '../../components'
import { useCreateRoom } from '../../api'
import _ from 'lodash'
import { useFieldArray, useForm } from 'react-hook-form'
import { CreateRoomFormFields } from './types'
import { uniqueNames } from '../../utils/validation'

const CreateRoom: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
  const [{ data: reqData }, sendCreateRoom] = useCreateRoom()

  const onSubmit = async (values: CreateRoomFormFields) => {
    const dataToReq = {
      users: values.users.map((user) => ({ name: user.name })),
      cost: values.cost ? +values.cost : undefined,
    }
    const { data } = await sendCreateRoom({
      data: dataToReq,
    })
    if (!data) return
    if (!data?.error) {
      dispatch(
        setCreatedRoom({
          roomId: data.data.room_id,
          roomPassword: data.data.room_root_password,
        })
      )
      navigate('success')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Title>Введите список участников:</Title>
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
      <ErrorMessage message={reqData?.error} className={styles.formError} />
    </form>
  )
}

export default CreateRoom
