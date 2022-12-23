import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { InputNumber } from 'rsuite'
import { ErrorMessage } from '..'
import styles from './styles.module.scss'

type CostInputProps = {
  control: Control<any>
  error?: string
  label: string
}

const CostInput: FC<CostInputProps> = ({ control, error, label }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <label className={styles.label}>{label}</label>
        <Controller
          name="cost"
          rules={{
            min: {
              value: 0,
              message: 'Максимальная сумма заказа не может быть ниже нуля',
            },
          }}
          control={control}
          render={({ field }) => (
            <InputNumber {...field} onChange={(_, e) => field.onChange(e)} />
          )}
        />
        <ErrorMessage message={error} className={styles.error} />
      </div>
    </>
  )
}

export default CostInput
