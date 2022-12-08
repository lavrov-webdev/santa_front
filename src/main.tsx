import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configure as configureAxiosHooks } from 'axios-hooks'
import LRU from 'lru-cache'
import instance from './api/instance'

const cache = new LRU({ max: 10 })

configureAxiosHooks({ axios: instance, cache })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
