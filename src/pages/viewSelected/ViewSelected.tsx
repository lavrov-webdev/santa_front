import { FC } from 'react'
import { useAppSelector } from '../../store/store'
import styles from './stlyles.module.scss'

const ViewSelected: FC = () => {
  const recipient = useAppSelector((state) => state.account.recipient)

  return (
    <div className={styles.index}>
      <h4 className={styles.indexHeader}>
        {!recipient
          ? 'Вы пока никого не выбрали'
          : `Вы уже выбрали пользователя ${recipient.name}`}
      </h4>
    </div>
  )
}

export default ViewSelected
