import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../store/authorization';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../const/const';
import TestingProfiles from '../components/TestingProfiles';

import { ToastContainer } from 'react-toastify';
import { showErrorToast } from '../components/Toasts/showToasts';

const LoginPage = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const isErrorMessage = useAppSelector((store) => store.auth.errorMessage); // tostify
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleInputLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(loginUser({ login, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.Profile, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isErrorMessage) {
      showErrorToast('Ошибка! Попробуйте еще раз!');
    }
  }, [isErrorMessage]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <Box
          sx={{ maxWidth: '480px', display: 'flex', flexDirection: 'column' }}
        >
          <Typography sx={{ fontWeight: 400, fontSize: '34px' }}>
            Авторизация
          </Typography>
          <Typography
            sx={{ marginTop: '90px', fontWeight: 400, fontSize: '24px' }}
          >
            Вход
          </Typography>
          <FormControl sx={{ m: 1, width: '25ch', alignSelf: 'center' }}>
            {/* <InputLabel htmlFor="outlined-adornment-login">Логин</InputLabel> */}
            <TextField
              id="outlined-basic"
              label="Логин"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              variant="outlined"
              value={login}
              placeholder="Введите e-mail"
              onChange={(e) => {
                handleInputLoginChange(e);
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch', alignSelf: 'center' }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                handleInputPasswordChange(e);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ m: 1, width: '25ch', alignSelf: 'center' }}
          >
            Войти
          </Button>
        </Box>
      </Grid2>

      {/* Test Profiles Section */}
      <Grid2 size={6}>
        <Typography sx={{ fontWeight: 400, fontSize: '34px' }}>
          Тестовые профили
        </Typography>
        <TestingProfiles />
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
