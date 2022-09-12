import { createSlice } from '@reduxjs/toolkit'

const data = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null

const initialState = {
  data,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload))
      state.data = action.payload
    },
    logout: (state) => {
      localStorage.removeItem('token')
      state.data = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer