import { combineReducers } from "redux";
import rtkReducer from "./rtkSlice";
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileStore";
import authorizationReducer from "./authorization";

const rootReducer = combineReducers({
  counter: rtkReducer,
  auth: authorizationReducer,
  profile: profileSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
