import { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonProps } from 'rsuite'

type LinkButtonProps = {
  to: string
} & ButtonProps

const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = ({
  to,
  ...rest
}) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(to)
  }

  return <Button onClick={clickHandler} {...rest} />
}

export default LinkButton
