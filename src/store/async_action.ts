import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './actions'

// это асинхронный экшен creator
// позволяет выполнить побочное действие типа запроса, а потом диспатчит синхронные экшены

export const fetchData = () => {
  return async function request(dispatch) {
    // отправляем в стор сообщение о том, что начали запрос. можем пока отрисовать лоадер
    dispatch(fetchDataRequest())
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const json = await res.json()
      dispatch(fetchDataSuccess(json)) // получили результат, диспатчим синхронный экшен
    } catch {
      dispatch(fetchDataFailure)
    }
  }
}
