import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { loginUser } from '../store/authorization'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { replace, useNavigate } from 'react-router-dom'
import { AppRoute } from '../const/const'

const LoginPage = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleInputPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value)
  }

  const handleInputLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(loginUser({ login, password }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.TestPage, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <Box>
      <Box>
        <FormControl sx={{ m: 1, width: '25ch' }}>
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
              handleInputLoginChange(e)
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => {
              handleInputPasswordChange(e)
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
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
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Войти
      </Button>
    </Box>
  )
}

export default LoginPage
