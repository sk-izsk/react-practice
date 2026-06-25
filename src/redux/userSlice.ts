import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { jsonPlaceholderApi } from '../api/ky.jsonPlaceHolder'
import type { User } from '../types/jsonPlaceHolder'

interface UserState {
  users: User[]
  status: 'success' | 'idle' | 'error' | 'loading'
  error: any
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: '',
}

export const fetchUsers = createAsyncThunk('users', async () => {
  try {
    const response = await jsonPlaceholderApi.get('/users')
    return response
  } catch (err) {
    console.error(err)
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'success'
        state.users = action.payload as User[]
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.users = []
      })
  },
})

export default userSlice.reducer
