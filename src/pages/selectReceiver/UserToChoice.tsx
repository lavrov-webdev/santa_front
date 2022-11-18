import React, {FC, useState} from 'react'
import {ResType, TUser} from '../../api/types'
import styles from './styles.module.scss'
import cn from 'classnames'
import useAxios from "axios-hooks";
import {useAppSelector} from "../../store/store";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

type UserToChoiceProps = {
  id: number,
  hasOpenedCard: boolean,
  onSelect: (v: boolean) => void
} & Omit<TUser, "id">

const UserToChoice: FC<UserToChoiceProps> = ({id, name, hasOpenedCard, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false)
  const loggedUser = useAppSelector(store => store.users.loggedUser)
  const roomId = useAppSelector(state => state.room.roomId)
  const [isChose, setIsChose] = useState(false);
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
  const selectHander = async () => {
    onSelect(true)
    setIsOpen(true)
    const {data} = await sendSelectUser()
    if (data.error) {
      onSelect(false)
      setIsOpen(false)
    } else {
      setIsChose(true)
    }
  }
  return (
    <>
      <div
        className={cn(
          styles.userWrapper,
          {[styles.Unactive]: hasOpenedCard}
        )}
        onClick={hasOpenedCard ? undefined : selectHander}
      >
        <div className={cn(
          styles.userInner,
          {[styles.Active]: isOpen}
        )}>
          <div className={styles.userFront}>Выбери меня!</div>
          <div className={styles.userBack}>{name} {id}</div>
        </div>
      </div>
      {isChose && <Confetti
				width={width}
				height={height}
				numberOfPieces={500}
			/>}
    </>
  )
}

export default UserToChoice;
