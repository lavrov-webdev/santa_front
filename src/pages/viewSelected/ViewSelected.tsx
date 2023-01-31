import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import styles from './stlyles.module.scss'

const ViewSelected: FC = () => {
  const recipient = useAppSelector((state) => state.account.recipient)
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [recipient])

  return (
    <div className={styles.index}>
      <h4 className={styles.indexHeader}>
        Вы уже выбрали пользователя {recipient?.name}
      </h4>
    </div>
  )
}

export default ViewSelected
