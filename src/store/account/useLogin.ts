import { useAppDispatch } from '../store'
import { checkRecipient, getPotentialRecipients, setPassword } from './api'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return async (
    selectedUser: string | null,
    hasPassword: boolean,
    password: string,
    roomId?: string
  ) => {
    if (!selectedUser) return
    const loginData = {
      user_id: selectedUser,
      room_id: roomId || '',
      password,
    }
    if (!hasPassword) {
      await dispatch(setPassword(loginData))
    }
    const checkRecipientRes = await dispatch(checkRecipient(loginData)).unwrap()
    if (checkRecipientRes.recipient) {
      navigate('/view-selected')
      return
    }
    const getPotentialRecipientsRes = await dispatch(
      getPotentialRecipients(loginData)
    ).unwrap()
    if (getPotentialRecipientsRes) navigate('/select')
  }
}
