import { FC } from "react";
import { Button, Modal } from "rsuite";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";

type SuccessModalProps = {
  open: boolean;
  handleClose: () => void;
};

const SuccessModal: FC<SuccessModalProps> = ({ open, handleClose }) => {
  const selectedUser = useAppSelector((store) => store.users.selectedUser);
  const roomCost = useAppSelector((store) => store.room.cost);
  const navigate = useNavigate();

  const closeModal = () => {
    handleClose();
    navigate("/");
  };

  if (!selectedUser) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Успех!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Вы выбрали пользователя <b>{selectedUser.name}</b>
        </p>
        {roomCost && (
          <p>
            Максимальная сумма подарка в этом розыгрыше: <b>{roomCost} ₽</b>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
