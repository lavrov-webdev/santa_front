import React, {FC} from 'react'
import {useFieldArray, useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import {Button, Message} from 'rsuite';
import NameInput from './NameInput';
import {CreateRoomFormPops} from './types';
import useAxios from "axios-hooks";
import {useAppDispatch} from "../../store/store";
import {CreateRoomRes, ResType} from "../../api/types";
import {setCreatedRoom} from "../../store/roomSlice";
import styles from './styles.module.scss'

const CreateRoom: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [{data: reqData, loading}, execute] = useAxios<ResType<CreateRoomRes>>({
    method: "post",
    url: "room/create"
  }, {manual: true})

  const {control, handleSubmit} = useForm<CreateRoomFormPops>({
    defaultValues: {
      names: [{value: ""}]
    },
  });
  const {fields, append, remove} = useFieldArray({
    name: 'names',
    control,
  })

  const onAppend = () => {
    append({value: ''})
  }

  const onSubmit = async (formData: CreateRoomFormPops) => {
    const dataToReq = {
      users: formData.names.map(name => ({name}))
    }
    const {data} = await execute({
      data: dataToReq
    })
    if (!data?.error) {
      dispatch(setCreatedRoom({
        roomId: data?.data.room_id,
        roomPassword: data?.data.room_root_password
      }))
      navigate('success')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.title}>Введите список участников:</div>
      <ul className={styles.formList}>
        {fields.map((item, idx) => (
          <li key={item.id} className={styles.formItem}>
            <NameInput idx={idx} control={control}/>
            <div className={styles.formItemDeleteButton}>
              <Button onClick={() => remove(idx)}>Удалить</Button>
            </div>
          </li>
        ))}
      </ul>
      {reqData?.error && <Message className={styles.formError} type='error'>{reqData?.error}</Message>}
      <Button appearance="ghost" onClick={onAppend} block>Добавить участника</Button>
      <Button
        appearance="primary"
        type="submit"
        disabled={fields.length < 3}
        loading={loading}
        block
      >
        Создать комнату
      </Button>
    </form>
  )
}

export default CreateRoom;
