import './App.css'
import Header from './components/Header/Header.tsx'
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { increment, decrement, fetchUsers, addUserById } from './store/rtkSlice'

function App() {
  const counter = useAppSelector((state) => state.counter.value)
  const users = useAppSelector((state) => state.counter.users)
  const pending = useAppSelector((state) => state.counter.pending)

  const dispatch = useAppDispatch()

  const handleAddUser = () => {
    const id: number = Math.floor(Math.random() * 10 + 1)
    dispatch(addUserById(id))
  }

  return (
    <>
      <Header/>
      <h1>Counter: {counter}</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </ButtonGroup>

      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={() => dispatch(fetchUsers())}>
          Запросить данные
        </Button>
        <Button variant="contained" onClick={handleAddUser}>
          Добавить пользователя
        </Button>
        <List>
          {pending && <p>Loading ...</p>}
          {users.length > 0 &&
            users.map((item) => {
              return (
                <ListItem key={item.id}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              )
            })}
        </List>
      </Box>
    </>
  )
}

export default App
