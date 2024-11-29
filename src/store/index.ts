import { Action, combineReducers, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer, { logOut } from './authorization';
import userFavouritesReducer from './user-favourites/userFavourites';
import profileReducer from './profileStore';
import { helpRequestData } from './help-requests/help-requests-data';

const rootReducer = combineReducers({
  auth: authorizationReducer,
  profile: profileReducer,
  favourites: userFavouritesReducer,
  HELP_REQUEST: helpRequestData.reducer,
  // остальные редьюсеры
});

type RootState = ReturnType<typeof rootReducer>;

// задавили линтер по необходимости согласно инструкции редакса https://redux.js.org/usage/usage-with-typescript
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const authMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // здесь ловим 403 ошибку
    const typedAction = action as Action;
    //debugger;
    if (
      typedAction.type.endsWith('rejected') &&
      // @ts-expect-error fix later
      typedAction.error.message === '403'
    ) {
      //debugger;
      store.dispatch(logOut());
    }

    return next(action);
  };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
  devTools: true,
});
