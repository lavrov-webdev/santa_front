import React, {FC, useState} from 'react'
import {ResType, TUser} from '../../api/types'
import styles from './styles.module.scss'
import cn from 'classnames'
import useAxios from "axios-hooks";
import {useAppDispatch, useAppSelector} from "../../store/store";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import {selectUser} from "../../store/usersSlice";

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
  const [_, sendSelectUser] = useAxios<ResType<any>>({
    url: 'room/select',
    data: {
      room_id: roomId,
      choosing_user_id: loggedUser,
      selected_user_id: id
    },
    method: "put"
  }, {manual: true})

  const selectHandler = async () => {
    onSelect(true)
    setIsOpen(true)
    const {data} = await sendSelectUser()
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
