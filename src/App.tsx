import './App.css'
import { Button, ButtonGroup } from '@mui/material'
import { increment, decrement } from './store/actions'
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const counter = useSelector((state: any) => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter: {counter}</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </ButtonGroup>
    </>
  )
}

export default App
