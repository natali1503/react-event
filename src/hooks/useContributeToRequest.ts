import { fetchСontributeToRequest } from '../store/api-actions';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { HelpRequest } from '../types/HelpRequest';
import { unwrapResult } from '@reduxjs/toolkit';
import { IError } from '../types/IError';

const useContributeToRequest = (helpRequest: HelpRequest | undefined) => {
  const dispatch = useAppDispatch();

  const handleContributeToRequest = () => {
    if (helpRequest) {
      dispatch(fetchСontributeToRequest({ id: helpRequest.id }))
        .then(unwrapResult) // Обрабатываем успешный результат
        .then(() => {
          toast.success('Успех! Спасибо за помощь!');
        })
        .catch((error: IError) => {
          // Обрабатываем ошибки из rejectWithValue
          toast.error(`Ошибка! ${error.message || 'Попробуйте еще раз'}`);
        });
    }
  };

  return { handleContributeToRequest };
};

export default useContributeToRequest;
