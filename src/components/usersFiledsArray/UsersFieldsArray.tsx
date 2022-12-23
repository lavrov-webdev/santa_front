import { FC } from 'react'
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form'
import { Button, Input } from 'rsuite'
import { ErrorMessage } from '..'
import styles from './styles.module.scss'

type CustomFieldsArrayProps = {
  fields: FieldArrayWithId[]
  control: Control<any>
  errors: any
  remove?: UseFieldArrayRemove
  append?: UseFieldArrayAppend<any, any>
  name: string
}

const UsersFieldsArray: FC<CustomFieldsArrayProps> = ({
  fields,
  control,
  errors,
  remove,
  append,
  name,
}) => {
  return (
    <ul className={styles.list}>
      {fields.map((user, idx) => (
        <li key={user.id} className={styles.item}>
          <div className={styles.itemInputWrapper}>
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
        </li>
      ))}
      {append && (
        <Button appearance="ghost" onClick={() => append({ name: '' })} block>
          Добавить участника
        </Button>
      )}

      {errors && errors[name] && (
        <ErrorMessage
          className={styles.listErrorMessage}
          message={errors[name].root?.message}
        />
      )}
    </ul>
  )
}

export default UsersFieldsArray
