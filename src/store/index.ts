import { combineReducers } from 'redux'
import rtkReducer from './rtkSlice'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  counter: rtkReducer,
  // остальные редьюсеры
})

export const store = configureStore({
  reducer: rootReducer,
})
