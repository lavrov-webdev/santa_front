import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'rsuite/dist/rsuite.min.css'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
