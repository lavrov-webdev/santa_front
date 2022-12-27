import { FC } from 'react'
import { Control, Controller, UseFieldArrayRemove } from 'react-hook-form'
import { Button, Input, Tooltip, Whisper } from 'rsuite'
import styles from './styles.module.scss'
import CheckIcon from '@rsuite/icons/Check'
import CloseIcon from '@rsuite/icons/Close'
import { ErrorMessage } from '..'

type UserProps = {
  hasChoisen?: boolean
  control: Control<any>
  remove?: UseFieldArrayRemove
  idx: number
  name: string
  errors: any
}

const User: FC<UserProps> = ({
  control,
  hasChoisen,
  remove,
  idx,
  name,
  errors,
}) => {
  return (
    <>
      <div className={styles.itemInputWrapper}>
        {hasChoisen && (
          <Controller
            control={control}
            render={({ field }) => (
              <div className={styles.itemHasChoice}>
                <Whisper
                  placement="top"
                  controlId="control-id-hover"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      {field.value
                        ? 'Пользователь уже кого-то выбрал'
                        : 'Польователь ещё никого не выбрал'}
                    </Tooltip>
                  }
                >
                  {field.value ? <CheckIcon /> : <CloseIcon />}
                </Whisper>
              </div>
            )}
            name={`${name}.${idx}.has_choice`}
          />
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Имя не может быть пустым' },
          }}
          render={({ field }) => (
            <Input {...field} onChange={(_, e) => field.onChange(e)} />
          )}
          name={`${name}.${idx}.name`}
        />
        {remove && (
          <div className={styles.itemDeleteButton}>
            <Button onClick={() => remove(idx)}>Удалить</Button>
          </div>
        )}
      </div>
      {errors && errors[name] && (
        <ErrorMessage
          message={errors[name][idx]?.name?.message}
          className={styles.itemErrorMessage}
        />
      )}
    </>
  )
}

export default User
