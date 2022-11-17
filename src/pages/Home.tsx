import React, {FC} from 'react'
import {LinkButton} from '../components';
import styles from './styles.module.scss'

type HomeProps = {}

const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.homeWrapper}>
      <LinkButton to='create-room' appearance='primary' size='lg'>Создать комнату</LinkButton>
      <LinkButton to="join-room" size='lg' appearance="ghost">Присоедениться к комнате</LinkButton>
    </div>
  )
}

export default Home;
