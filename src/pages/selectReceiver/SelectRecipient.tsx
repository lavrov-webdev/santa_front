import { FC, useEffect, useState } from 'react'
import UserToChoice from './UserToChoice'
import styles from './styles.module.scss'
import SuccessModal from './SuccessModal'
import { useLatest } from 'react-use'
import { useAppSelector } from '../../store'
import { useNavigate } from 'react-router-dom'

const SelectRecipient: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasOpenedCard, setHasOpenedCard] = useState(false)
  const potentialRecipients = useAppSelector(
    (state) => state.account.potentialRecipients
  )
  const hacOpenedCardLatest = useLatest(hasOpenedCard)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (hacOpenedCardLatest) setIsModalOpen(true)
    }, 2000)
  }, [hasOpenedCard])

  useEffect(() => {
    if (potentialRecipients.length < 1) {
      navigate('/')
    }
  }, [potentialRecipients])

  return (
    <>
      <div className={styles.selectList}>
        {potentialRecipients.map((u) => (
          <UserToChoice
            onSelect={setHasOpenedCard}
            hasOpenedCard={hasOpenedCard}
            id={u.id}
            name={u.name}
            key={u.id}
          />
        ))}
      </div>
      <SuccessModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default SelectRecipient
