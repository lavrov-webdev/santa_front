import React, {FC, useState} from "react";
import {useAppSelector} from "../../store/store";
import {useProtect} from "../../hooks";
import UserToChoice from "./UserToChoice";
import styles from './styles.module.scss'

const SelectReceiver: FC = () => {
  const usersToChoice = useAppSelector(state => state.users.usersToChoice)
  const protect = () => usersToChoice.length === 0
  useProtect([protect], [usersToChoice], "/")
  const [hasOpenedCard, setHasOpenedCard] = useState(false)

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

    </>
  )
}

export default SelectReceiver
