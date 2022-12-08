import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'rsuite/dist/rsuite.min.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { useState } from 'react'
import { Input } from 'rsuite'

function App() {
  const [value, setValue] = useState('')
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Input value={value} onChange={setValue} />
    </Provider>
  )
}

export default App
