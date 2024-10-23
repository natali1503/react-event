// ниже это экшены
// лучше их вынести в переменные, чтобы не попутать написание в редьюсере и экшен криэторе

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

// ниже это все синхронные экшен креэйторы
// они нам нужны, чтобы диспатчить их уже после обработки асинхронного запроса

export const increment = () => {
  return {
    type: INCREMENT,
  }
}

export const decrement = () => {
  return {
    type: DECREMENT,
  }
}

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  }
}

export const fetchDataSuccess = (payload: any) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
})

export const fetchDataFailure = (error: any[]) => {
  return {
    type: FETCH_DATA_FAILURE,
    error,
  }
}
