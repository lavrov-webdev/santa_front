import { FC } from 'react'
import { Loader as RSLoader } from 'rsuite'
import styles from './styles.module.scss'

const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <RSLoader />
    </div>
  )
}

export default Loader
