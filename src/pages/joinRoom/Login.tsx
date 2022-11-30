import React, {FC, useEffect, useMemo} from 'react'
import {Button, SelectPicker} from 'rsuite'
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "axios-hooks";
import {GetRoomInfoRes, LoginRoomRes} from "../../api/types";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {selectUser, setLoggedUser, setUsersToChoice} from "../../store/usersSlice";
import styles from './styles.module.scss'
import {joinToRoom} from "../../store/roomSlice";

const Login: FC = () => {
  const {roomId} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedUser = useAppSelector(state => state.users.loggedUser)
  const [{data, loading}, refetch] = useAxios<GetRoomInfoRes>(
    `room/${roomId}`
  )
  const [_, login] = useAxios<LoginRoomRes>({
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
    if (data?.data) {
      dispatch(joinToRoom({
        cost: data.data.cost,
        roomId: roomId!
      }))
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [roomId])


  const onLogin = async () => {
    const {data} = await login()
    if (!data.error) {
      if (data.data.selected_user) {
        dispatch(selectUser(data.data.selected_user))
      } else {
        dispatch(setUsersToChoice(data.data.users_to_select))
      }
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
