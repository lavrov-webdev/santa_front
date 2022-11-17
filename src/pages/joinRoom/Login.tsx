import React, {FC, useEffect, useMemo} from 'react'
import {Button, SelectPicker} from 'rsuite'
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {ResType, TUser} from "../../api/types";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {setLoggedUser, setUsersToChoice} from "../../store/usersSlice";
import styles from './styles.module.scss'
import {setRoomId} from "../../store/roomSlice";

const Login: FC = () => {
  const {roomId} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedUser = useAppSelector(state => state.users.loggedUser)
  const [{data, loading, error}, refetch] = useAxios<ResType<{ users_to_login: TUser[] }>>(
    `room/${roomId}`
  )
  const [_, login] = useAxios<ResType<{ users_to_select: TUser[] }>>({
    url: 'room/login',
    method: "post",
    data: {
      room_id: roomId,
      user_id: selectedUser
    }
  }, {manual: true})

  const usersToSelect = useMemo(() => {
    return data?.data.users_to_login?.map(u => ({label: u.name, value: u.id}))
  }, [data])

  const setSelectedUser = (id: number) => {
    dispatch(setLoggedUser(id))
  }

  useEffect(() => {
    dispatch(setRoomId(roomId))
    refetch()
  }, [roomId])

  const onLogin = async () => {
    const {data} = await login()
    if (!data.error) {
      dispatch(setUsersToChoice(data.data.users_to_select))
      navigate('/select')
    }
  }

  return (
    <div className={styles.loginWrapper}>
      {
        (loading || !usersToSelect) ? <div>Loading...</div> :
          data?.error ?
            <div className={styles.loginError}>{data?.error}</div> :
            (usersToSelect.length > 0) ? (
              <div className={styles.loginSelectBlock}>
                <span className={styles.loginSubtitle}>Выберите себя в списке ниже: </span>
                <SelectPicker
                  onChange={(value) => setSelectedUser(value as number)}
                  value={selectedUser}
                  data={usersToSelect}
                  block
                  />
                <Button className={styles.loginSelectBlockButton} block onClick={onLogin}>Войти</Button>
              </div>

            ) : (
              <div className={styles.loginError}>
                В этой комнате не осталось не выбравших пользователей
              </div>
            )}
    </div>
  )
}

export default Login;
