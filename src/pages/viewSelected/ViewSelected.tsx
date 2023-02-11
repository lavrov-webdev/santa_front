import { FC } from 'react'
import { useAppSelector } from '../../store/store'
import styles from './stlyles.module.scss'

const ViewSelected: FC = () => {
  const recipient = useAppSelector((state) => state.account.recipient)
  const cost = useAppSelector((state) => state.actualRoom.cost)

  return (
    <div className={styles.index}>
      <h4>
        {!recipient
          ? 'Вы пока никого не выбрали'
          : `Вы уже выбрали пользователя ${recipient.name}`}
      </h4>
      <h5>Максимальная сумма подарка - {cost}₽</h5>
    </div>
  )
}

export default ViewSelected
