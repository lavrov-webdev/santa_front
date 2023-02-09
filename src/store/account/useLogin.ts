import { useAppDispatch } from '../store'
import { checkRecipient, getPotentialRecipients } from './api'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return async (selectedUser: number | null, roomId?: string) => {
    if (!selectedUser) return
    const loginData = {
      user_id: selectedUser,
      room_id: roomId || '',
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
