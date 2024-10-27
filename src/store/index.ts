import { combineReducers, Middleware } from 'redux'
import rtkReducer from './rtkSlice'
import { configureStore } from '@reduxjs/toolkit'
import authorizationReducer, { logOut } from './authorization'
import { requestUnsuccessfullByDesign } from './authorization'

const rootReducer = combineReducers({
  counter: rtkReducer,
  auth: authorizationReducer,
  // остальные редьюсеры
})

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected')) {
    if (action.payload?.status === 500) {
      console.log('ИЗ миддлавара с ошибкой 500')
      // debugger
      // просто ошибка сервера, не убираем флаг isAuth и не редиректимся на страницу логина
      store.dispatch(requestUnsuccessfullByDesign())
    } else if (action.payload?.status === 403) {
      // просрочился jwt, убираем флаг isAuth и редиректимся на страницу логина
      store.dispatch(logOut())
      // debugger
      console.log('ИЗ миддлавара с ошибкой 403')
    }
  }

  return next(action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})
