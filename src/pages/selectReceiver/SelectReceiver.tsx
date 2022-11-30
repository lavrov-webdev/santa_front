import React, {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../store/store";
import {useProtect} from "../../hooks";
import UserToChoice from "./UserToChoice";
import styles from './styles.module.scss'
import SuccessModal from "./SuccessModal";
import {useLatest} from "react-use";

const SelectReceiver: FC = () => {
  const usersToChoice = useAppSelector(state => state.users.usersToChoice)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpenedCard, setHasOpenedCard] = useState(false)
  const hacOpenedCardLatest = useLatest(hasOpenedCard)
  const protect = () => usersToChoice.length === 0
  useProtect([protect], [usersToChoice], "/")

  useEffect(() => {
    setTimeout(() => {
      if (hacOpenedCardLatest) setIsModalOpen(true)
    }, 2000)
  }, [hasOpenedCard])

  return (
    <>
      <div className={styles.selectList}>
        {usersToChoice.map(u => <UserToChoice
          onSelect={setHasOpenedCard}
          hasOpenedCard={hasOpenedCard}
          id={u.id}
          name={u.name} key={u.id}/>
        )}
      </div>
      <SuccessModal open={isModalOpen} handleClose={() => setIsModalOpen(false)}/>
    </>
  )
}

export default SelectReceiver
