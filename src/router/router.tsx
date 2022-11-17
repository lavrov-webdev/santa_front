import {createBrowserRouter} from "react-router-dom";
import {Main} from "../layouts";
import {Home} from "../pages";
import {CreateRoom, CreateRoomSuccess} from "../pages/createRoom";
import Login from "../pages/joinRoom/Login";
import {SelectReceiver} from "../pages/selectReceiver";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'create-room',
        element: <CreateRoom/>,
      },
      {
        path: 'create-room/success',
        element: <CreateRoomSuccess/>
      },
      {
        path: 'room/:roomId',
        element: <Login/>,
      },
      {
        path: 'select',
        element: <SelectReceiver/>,
      }
    ]
  }
])
