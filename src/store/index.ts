import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer from './authorization'
import { helpRequestData } from './help-requests/help-requests-data'

const rootReducer = combineReducers({
  //counter: rtkReducer,
  auth: authorizationReducer,
  "HELP_REQUEST": helpRequestData.reducer,
  // остальные редьюсеры
})

export const store = configureStore({
  reducer: rootReducer,
})
