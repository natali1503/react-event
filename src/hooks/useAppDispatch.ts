import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/types'

// Типизация useDispatch() необходима согласно доке
// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch = () => useDispatch<AppDispatch>();
