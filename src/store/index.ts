import { combineReducers } from 'redux';
import rtkReducer from './rtkSlice';
import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileStore';
import authorizationReducer from './authorization';
import profileReducer from './profileStore';

const rootReducer = combineReducers({
  auth: authorizationReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
