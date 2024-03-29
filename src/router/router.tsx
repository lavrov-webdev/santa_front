import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Main } from '../layouts'
import { Home } from '../pages'
import { CreateRoom, CreateRoomSuccess } from '../pages/createRoom'
import { EditRoom } from '../pages/editRoom'
import { Login } from '../pages/joinRoom'
import { SelectRecipient } from '../pages/selectReceiver'
import { ViewSelected } from '../pages/viewSelected'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'create-room',
        element: <CreateRoom />,
      },
      {
        path: 'create-room/success',
        element: <CreateRoomSuccess />,
      },
      {
        path: 'room/:roomId',
        element: <Login />,
      },
      {
        path: 'select',
        element: <SelectRecipient />,
      },
      {
        path: 'view-selected',
        element: <ViewSelected />,
      },
      {
        path: 'room/:roomId/edit',
        element: <EditRoom />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
])
