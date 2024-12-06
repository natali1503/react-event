import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const formAuthorizationSlice = createSlice({
  name: 'formAuthorization',
  initialState: {
    login: <string>'',
    password: <string>'',
    emailError: <string>'',
    passwordError: <string>'',
  },
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
      formAuthorizationSlice.caseReducers.setEmailError(state);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      formAuthorizationSlice.caseReducers.setPasswordError(state);
    },
    setEmailError: (state) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (state.login && !emailRegex.test(state.login)) {
        state.emailError = 'Введите корректный email-адрес';
      } else {
        state.emailError = '';
      }
    },
    setPasswordError: (state) => {
      if (state.password.length < 5) {
        state.passwordError = 'Пароль не менее 5 символов';
      } else {
        state.passwordError = '';
      }
    },
  },
});
export const { setLogin, setPassword } = formAuthorizationSlice.actions;
export default formAuthorizationSlice.reducer;
