import { FC } from "react";
import { useAppSelector } from "../../store/store";
import { useProtect } from "../../hooks";
import styles from "./stlyles.module.scss";

const ViewSelected: FC = () => {
  const selectedUser = useAppSelector((store) => store.users.selectedUser);
  useProtect([() => !selectedUser], [selectedUser]);

  return (
    <div className={styles.index}>
      <h4 className={styles.indexHeader}>
        Вы уже выбрали пользователя {selectedUser?.name}
      </h4>
    </div>
  );
};

export default ViewSelected;
