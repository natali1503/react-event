import { createStore, combineReducers } from 'redux';
import { counterReducer } from './reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  // остальные редьюсеры
})

const store = createStore(rootReducer);

export default store;