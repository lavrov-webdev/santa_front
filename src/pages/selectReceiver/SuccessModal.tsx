import { FC } from 'react'
import { Button, Modal } from 'rsuite'
import { useAppSelector } from '../../store/store'
import { useNavigate } from 'react-router-dom'

type SuccessModalProps = {
  open: boolean
  handleClose: () => void
}

const SuccessModal: FC<SuccessModalProps> = ({ open, handleClose }) => {
  const navigate = useNavigate()
  const roomCost = useAppSelector((state) => state.actualRoom.cost)
  const recipient = useAppSelector((state) => state.account.recipient)

  const closeModal = () => {
    handleClose()
    navigate('/view-selected')
  }

  if (!recipient) return null

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Успех!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Вы выбрали пользователя <b>{recipient.name}</b>
        </p>
        {roomCost && (
          <p>
            Максимальная сумма подарка в этом розыгрыше: <b>{roomCost} ₽</b>
          </p>
        )}
        <a
          href="https://lavrov.space/donations"
          target="_blank"
          style={{ color: 'inherit' }}
        >
          Сказать спасибо автору
        </a>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeModal} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessModal
