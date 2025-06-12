/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import Encryption from '@/services/encryption'

const initialState = {
  bio: '',
  email: '',
  image: null,
  token: '',
  username: '',
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload }
    },

    clearUser() {
      localStorage.removeItem('user')
      return initialState
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setLoading, setError } = userSlice.actions

export const saveUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true))

    const cryptoService = new Encryption()
    const encrypted = await cryptoService.encrypt(userData)
    localStorage.setItem('user', JSON.stringify(encrypted))

    dispatch(setUser(userData))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const userData = localStorage.getItem('user')

    if (!userData) {
      dispatch(clearUser())
      return
    }

    const cryptoService = new Encryption()
    const decrypted = await cryptoService.decrypt(JSON.parse(userData))

    dispatch(setUser(decrypted))
  } catch (error) {
    dispatch(setError(error.message))
    // В случае ошибки дешифровки очищаем невалидные данные
    dispatch(clearUser())
  } finally {
    dispatch(setLoading(false))
  }
}

export default userSlice.reducer
