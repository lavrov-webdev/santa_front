import React, { FC, useEffect, useMemo } from "react";
import { Button, Loader, SelectPicker } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setLoggedUser, setUsersToChoice } from "../../store/usersSlice";
import styles from "./styles.module.scss";
import { joinToRoom } from "../../store/roomSlice";
import { useGetRoomInfo, useLogin } from "../../api";

const Login: FC = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedUser = useAppSelector((state) => state.users.loggedUser);

  const [{ data: roomInfoRes, loading }, refetch] = useGetRoomInfo(
    () => roomId ?? ""
  );
  const [{ loading: loginLoading }, login] = useLogin();

  const usersToSelect = useMemo(() => {
    return roomInfoRes?.data.users_to_login?.map((u) => ({
      label: u.name,
      value: u.id,
    }));
  }, [roomInfoRes]);

  const setSelectedUser = (id: number) => {
    dispatch(setLoggedUser(id));
  };

  useEffect(() => {
    if (roomInfoRes?.data) {
      dispatch(
        joinToRoom({
          cost: roomInfoRes.data.cost,
          roomId: roomId!,
        })
      );
    }
  }, [roomInfoRes]);

  useEffect(() => {
    refetch();
  }, [roomId]);

  const onLogin = async () => {
    if (!selectedUser) return;
    const { data } = await login({
      data: {
        user_id: selectedUser,
        room_id: roomId!,
      },
    });
    if (!data.error) {
      dispatch(setUsersToChoice(data.data.users_to_select));
      navigate("/select");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {loading || !usersToSelect || loginLoading ? (
        <Loader />
      ) : roomInfoRes?.error ? (
        <div className={styles.loginError}>{roomInfoRes?.error}</div>
      ) : usersToSelect.length > 0 ? (
        <div className={styles.loginSelectBlock}>
          <span className={styles.loginSubtitle}>
            Выберите себя в списке ниже:{" "}
          </span>
          <SelectPicker
            onChange={(value) => setSelectedUser(value as number)}
            value={selectedUser}
            data={usersToSelect}
            block
          />
          <Button
            className={styles.loginSelectBlockButton}
            block
            onClick={onLogin}
          >
            Войти
          </Button>
        </div>
      ) : (
        <div className={styles.loginError}>
          В этой комнате не осталось не выбравших пользователей
        </div>
      )}
    </div>
  );
};

export default Login;
