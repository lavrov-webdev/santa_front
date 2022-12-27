import { FC } from 'react'
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form'
import { Button } from 'rsuite'
import { ErrorMessage } from '..'
import styles from './styles.module.scss'
import User from './User'

type CustomFieldsArrayProps = {
  fields: FieldArrayWithId[]
  control: Control<any>
  errors: any
  remove?: UseFieldArrayRemove
  append?: UseFieldArrayAppend<any, any>
  name: string
  hasChoisen?: boolean
}

const UsersFieldsArray: FC<CustomFieldsArrayProps> = ({
  fields,
  control,
  errors,
  remove,
  append,
  name,
  hasChoisen,
}) => {
  return (
    <ul className={styles.list}>
      {fields.map((user, idx) => (
        <li key={user.id} className={styles.item}>
          <User {...{ control, hasChoisen, remove, idx, errors, name }} />
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
