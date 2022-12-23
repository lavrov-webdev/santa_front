import { CSSProperties, FC, PropsWithChildren } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { Message, MessageProps } from 'rsuite'

type TitleProps = {
  style?: CSSProperties
  size?: 's' | 'm' | 'l'
}

export const Title: FC<PropsWithChildren<TitleProps>> = ({
  children,
  style,
  size = 'l',
}) => {
  return (
    <div
      className={cn(styles.typoTitle, {
        [styles.large]: size === 'l',
        [styles.medium]: size === 'm',
        [styles.small]: size === 's',
      })}
      style={style}
    >
      {children}
    </div>
  )
}

export const ErrorMessage: FC<
  { message?: string | null } & Omit<MessageProps, 'children'>
> = ({ message, ...rest }) => {
  return message ? (
    <Message type="error" {...rest}>
      {message}
    </Message>
  ) : null
}
