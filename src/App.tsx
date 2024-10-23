import './App.css'
import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { increment, decrement } from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './store/async_action'

function App() {
  const counter = useSelector((state: any) => state.counter.counter)
  const list = useSelector((state: any) => state.counter.users)
  const loading = useSelector((state: any) => state.counter.loading)

  const dispatch = useDispatch()

  const requestUsersHandler = () => {
    dispatch(fetchData())
  }

  return (
    <>
      <h1>Counter: {counter}</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </ButtonGroup>

      <Box sx={{ m: 2 }}>
        <Button variant="contained" onClick={requestUsersHandler}>
          Запросить данные
        </Button>
        <List>
          {list.length > 0 &&
            !loading &&
            list.map((item) => {
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
