import { FC, useState } from 'react'
import { TUser } from '../../api/types'
import styles from './styles.module.scss'
import cn from 'classnames'
import { selectRecipient, useAppDispatch, useAppSelector } from '../../store'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

type UserToChoiceProps = {
  id: number
  hasOpenedCard: boolean
  onSelect: (v: boolean) => void
} & Omit<TUser, 'id'>

const UserToChoice: FC<UserToChoiceProps> = ({
  id,
  name,
  hasOpenedCard,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfettiRunning, setIsConfettiRunning] = useState(false)
  const { width, height } = useWindowSize()
  const account = useAppSelector((state) => state.account)
  const roomId = useAppSelector((state) => state.actualRoom.id)
  const dispatch = useAppDispatch()

  const selectHandler = async () => {
    if (!account.id || !roomId) return
    onSelect(true)
    setIsOpen(true)
    await dispatch(
      selectRecipient({
        selected_user_id: id,
        choosing_user_id: account.id,
        room_id: roomId,
      })
    )
    if (account.errorMessage) {
      onSelect(false)
      setIsOpen(false)
    } else {
      setIsConfettiRunning(true)
      setTimeout(() => {
        setIsConfettiRunning(false)
      }, 3000)
    }
  }
  return (
    <>
      <div
        className={cn(styles.userWrapper, { [styles.Unactive]: hasOpenedCard })}
        onClick={hasOpenedCard ? undefined : selectHandler}
      >
        <div className={cn(styles.userInner, { [styles.Active]: isOpen })}>
          <div className={styles.userFront}>Выбери меня!</div>
          <div className={styles.userBack}>{name}</div>
        </div>
      </div>
      {!!account.recipient && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={isConfettiRunning}
        />
      )}
    </>
  )
}

export default UserToChoice
