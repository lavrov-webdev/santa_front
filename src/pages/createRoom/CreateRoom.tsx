import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, InputNumber, Message } from 'rsuite'
import { CreateRoomFormFields } from './types'
import { useAppDispatch } from '../../store/store'
import { setCreatedRoom } from '../../store/roomSlice'
import styles from './styles.module.scss'
import { FieldArray, Form, Formik } from 'formik'
import { validateCreateRoomFrom } from './utils'
import { FormErrorMessage } from '../../components'
import { useCreateRoom } from '../../api'

const CreateRoom: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [{ data: reqData, loading }, sendCreateRoom] = useCreateRoom()

  const onSubmit = async (formData: CreateRoomFormFields) => {
    const dataToReq = {
      users: formData.names.map((name) => ({ name })),
      cost: formData.cost,
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
    <Formik
      initialValues={{ names: [''], cost: undefined }}
      onSubmit={onSubmit}
      validate={validateCreateRoomFrom}
    >
      {(formik) => (
        <Form className={styles.form}>
          <div className={styles.title}>Введите список участников:</div>
          <FieldArray name="names">
            {(arrayHelpers) => (
              <>
                <ul className={styles.formList}>
                  {formik.values.names && formik.values.names.length > 0
                    ? formik.values.names.map((name, idx) => (
                        <li key={idx} className={styles.formItem}>
                          <Input
                            value={name}
                            onChange={(_, e) => formik.handleChange(e)}
                            name={`names.${idx}`}
                          />
                          <div className={styles.formItemDeleteButton}>
                            <Button
                              disabled={formik.values.names.length < 2}
                              onClick={() => arrayHelpers.remove(idx)}
                            >
                              Удалить
                            </Button>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
                {reqData?.error && (
                  <Message className={styles.formError} type="error">
                    {reqData?.error}
                  </Message>
                )}
                <Button
                  appearance="ghost"
                  onClick={() => arrayHelpers.push('')}
                  block
                >
                  Добавить участника
                </Button>
                <FormErrorMessage className={styles.formError} name="names" />
              </>
            )}
          </FieldArray>
          <div className={styles.formSumGroup}>
            <label className={styles.formSumLabel}>
              Введите максимальную сумму подарка:
            </label>
            <InputNumber
              name="cost"
              value={formik.values.cost}
              onChange={(_, e) => formik.handleChange(e)}
            />
            <FormErrorMessage name="cost" className={styles.formError} />
          </div>
          <Button
            appearance="primary"
            type="submit"
            disabled={formik.values.names.length < 3}
            loading={loading}
            block
          >
            Создать комнату
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateRoom
