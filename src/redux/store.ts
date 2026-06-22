import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import counterReducer from './counterSlice'
import userReducer from './userSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = <T>(select: (s: RootState) => T) => useSelector<RootState, T>(select)

export const useAppDispatch = () => useDispatch<AppDispatch>()
