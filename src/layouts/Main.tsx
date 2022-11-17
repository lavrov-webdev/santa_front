import React, { FC } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.scss'

type MainProps = {

}

const Main: FC<MainProps> = () => {
  return (
    <div className={styles.mainWrapper}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main;
