import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export const baseQuery = fetchBaseQuery({ baseUrl: '/api' })
