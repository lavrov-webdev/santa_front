import React, {FC, useState} from 'react'
import {TUser} from '../../api/types'
import styles from './styles.module.scss'
import cn from 'classnames'
import {useAppDispatch, useAppSelector} from "../../store/store";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {selectUser} from "../../store/usersSlice";
import {useSelectUser} from "../../api";

type UserToChoiceProps = {
  id: number,
  hasOpenedCard: boolean,
  onSelect: (v: boolean) => void
} & Omit<TUser, "id">

const UserToChoice: FC<UserToChoiceProps> = ({id, name, hasOpenedCard, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(store => store.users.loggedUser)
  const selectedUser = useAppSelector(store => store.users.selectedUser)
  const roomId = useAppSelector(state => state.room.roomId)
  const {width, height} = useWindowSize()
  const [_, sendSelectUser] = useSelectUser()

  const selectHandler = async () => {
    if (!selectedUser || !loggedUser || !roomId) return
    onSelect(true)
    setIsOpen(true)
    const {data} = await sendSelectUser({
      data: {
        selected_user_id: selectedUser.id,
        choosing_user_id: loggedUser,
        room_id: roomId
      }
    })
    if (data.error) {
      onSelect(false)
      setIsOpen(false)
    } else {
      setIsConfettiRunning(true)
      setTimeout(() => {
        setIsConfettiRunning(false)
      }, 3000)
      dispatch(selectUser({id, name}))
    }
  }
  return (
    <>
      <div
        className={cn(
          styles.userWrapper,
          {[styles.Unactive]: hasOpenedCard}
        )}
        onClick={hasOpenedCard ? undefined : selectHandler}
      >
        <div className={cn(
          styles.userInner,
          {[styles.Active]: isOpen}
        )}>
          <div className={styles.userFront}>Выбери меня!</div>
          <div className={styles.userBack}>{name}</div>
        </div>
      </div>
      {
        !!selectedUser && <Confetti
					width={width}
					height={height}
					numberOfPieces={500}
					recycle={isConfettiRunning}
				/>
      }
    </>
  )
}

export default UserToChoice;
