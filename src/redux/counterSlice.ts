import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',

  initialState,

  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    reset: () => initialState,
  },
})

export default counterSlice.reducer
export const { increment, decrement, reset } = counterSlice.actions
