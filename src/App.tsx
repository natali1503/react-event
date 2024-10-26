import './App.css'
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
import CardList from './components/CardList/CardList'
import { HelpRequest } from "../../types/HelpRequest";

function App() {
  /*const counter = useAppSelector((state) => state.counter.value)
  const users = useAppSelector((state) => state.counter.users)
  const pending = useAppSelector((state) => state.counter.pending)

  const dispatch = useAppDispatch()*/

  /*const handleAddUser = () => {
    const id: number = Math.floor(Math.random() * 10 + 1)
    dispatch(addUserById(id))
  }*/

  const sortedRequestsList: HelpRequest[] = [
    {
      id: '1',
      title: 'Сбор средств для пенсионерки Ангелины Ивановны',
      organization: {
        title: 'Фонд помощи для ветеранов и инвалидов "Вера"',
        isVerified: true
      },
      description: 'Описание запроса на помощь.',
      goalDescription: 'Купить инвалидное кресло. Обеспечить продуктами на 4 месяца.',
      actionsSchedule: {
        stepLabel: 'Шаг 1',
        isDone:	true,
      },
      endingDate: '20.03.2025',
      location: {
        latitude: 40.712776,
        longitude: -74.005974,
        district: 'Владимирская',
        city: 'Владимир',
      },
      contacts: {
        email: 'contact@example.com',
        phone: '+123456789',
        website: 'https://example.com',
      },
      requesterType: 'person',
      helpType: 'material',
      helperRequirements: {
        helperType: 'single',
        isOnline: true,
        qualification: 'professional',
      },
      contributorsCount: 3566987,
      requestGoal: 2056489,
      requestGoalCurrentValue: 1102563,
    },
    {
      id: '1',
      title: 'Сбор средств для пенсионерки Ангелины Ивановны',
      organization: {
        title: 'Фонд помощи для ветеранов и инвалидов "Вера"',
        isVerified: true
      },
      description: 'Описание запроса на помощь.',
      goalDescription: 'Купить инвалидное кресло. Обеспечить продуктами на 4 месяца.',
      actionsSchedule: {
        stepLabel: 'Шаг 1',
        isDone:	true,
      },
      endingDate: '20.03.2025',
      location: {
        latitude: 40.712776,
        longitude: -74.005974,
        district: 'Владимирская',
        city: 'Владимир',
      },
      contacts: {
        email: 'contact@example.com',
        phone: '+123456789',
        website: 'https://example.com',
      },
      requesterType: 'person',
      helpType: 'material',
      helperRequirements: {
        helperType: 'single',
        isOnline: true,
        qualification: 'professional',
      },
      contributorsCount: 3566987,
      requestGoal: 2056489,
      requestGoalCurrentValue: 1102563,
    },
    {
      id: '1',
      title: 'Сбор средств для пенсионерки Ангелины Ивановны',
      organization: {
        title: 'Фонд помощи для ветеранов и инвалидов "Вера"',
        isVerified: true
      },
      description: 'Описание запроса на помощь.',
      goalDescription: 'Купить инвалидное кресло. Обеспечить продуктами на 4 месяца.',
      actionsSchedule: {
        stepLabel: 'Шаг 1',
        isDone:	true,
      },
      endingDate: '20.03.2025',
      location: {
        latitude: 40.712776,
        longitude: -74.005974,
        district: 'Владимирская',
        city: 'Владимир',
      },
      contacts: {
        email: 'contact@example.com',
        phone: '+123456789',
        website: 'https://example.com',
      },
      requesterType: 'person',
      helpType: 'material',
      helperRequirements: {
        helperType: 'single',
        isOnline: true,
        qualification: 'professional',
      },
      contributorsCount: 3566987,
      requestGoal: 2056489,
      requestGoalCurrentValue: 1102563,
    },
  ]

  return (
    <>
      <CardList helpRequests={ sortedRequestsList }/>
    </>
  )
}

export default App
