import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { helpRequestData } from './help-requests/help-requests-data'

const rootReducer = combineReducers({
  "HELP_REQUEST": helpRequestData.reducer,
  // остальные редьюсеры
})

export const store = configureStore({
  reducer: rootReducer,
})
