import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.scss'

type HeaderProps = {

}

const Header: FC<HeaderProps> = () => {
  return (
    <div className={styles.headerWrapper}>
      <Link className={styles.headerLink} to="/">
        Тайный Санта
      </Link>
    </div>
  )
}

export default Header;
