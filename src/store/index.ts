import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { counterReducer } from './reducer'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
  counter: counterReducer,
  // остальные редьюсеры
})

// Мы используем редакс 5 версии и не используем reduxjs/toolkit, поэтому
// для того, чтобы стор был доступен через расширение в хроме как девтулз
// необходимо его подключить вручную, а не через тулкит
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
