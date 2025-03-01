import { useSelector } from 'react-redux';

import type { RootState } from '../store/types';

// Типизация useSelector() необходима согласно доке
// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppSelector = useSelector.withTypes<RootState>();
