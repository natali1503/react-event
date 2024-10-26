import { combineReducers } from 'redux'
import rtkReducer from './rtkSlice'
import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer from './authorization'

const rootReducer = combineReducers({
  counter: rtkReducer,
  auth: authorizationReducer,
  // остальные редьюсеры
})

export const store = configureStore({
  reducer: rootReducer,
})
