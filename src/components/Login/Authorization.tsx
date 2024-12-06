import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useMode } from '../../theme';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginUser } from '../../store/authorization';
import { setPassword, setLogin } from '../../store/formAuthorization';

export function Authorization() {
  const errorMessage = useAppSelector((store) => store.auth.errorMessage);
  const { login, password, emailError, passwordError } = useAppSelector((store) => store.formAuthorization);

  const [theme] = useMode();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const passwordValue = e.target.value;
    dispatch(setPassword(passwordValue));
  };

  const handleInputLoginChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const email = e.target.value;
    dispatch(setLogin(email));
  };

  const handleSubmit = () => {
    if (!emailError) {
      dispatch(loginUser({ login, password }));
    }
  };

  return (
    <Box
      display={'flex'}
      width={'100%'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          justifyContent: 'center',
        },
      }}
    >
      <Box
        marginLeft={'4rem'}
        marginTop={'64px'}
        sx={{
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            marginLeft: '2rem',
          },
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            marginTop: '0rem',
            marginLeft: '0rem',
            padding: '3rem',
            paddingLeft: '6rem',
            paddingRight: '6rem',
          },
        }}
      >
        <Typography variant="h4">Авторизация</Typography>
        <Typography
          variant="h5"
          sx={{
            marginTop: 'calc(9rem + 0.047 * (100vw - 192rem))',
            marginBottom: '35px',
          }}
        >
          Вход
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
          <FormControl>
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
              error={!!emailError || !!errorMessage}
              helperText={emailError || errorMessage}
              sx={{ fontSize: '20rem' }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
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
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
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
            {(passwordError || errorMessage) && (
              <Typography color="error" variant="caption">
                {passwordError || errorMessage}
              </Typography>
            )}
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: '4rem' }}
          disabled={!login || !password || !!emailError || !!passwordError}
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
}
