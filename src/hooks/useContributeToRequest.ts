import { fetchContributeToRequest } from '../store/api-actions';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { HelpRequest } from '../types/HelpRequest';
import { unwrapResult } from '@reduxjs/toolkit';

const useContributeToRequest = (helpRequest: HelpRequest | undefined) => {
  const dispatch = useAppDispatch();

  const handleContributeToRequest = () => {
    if (helpRequest) {
      dispatch(fetchContributeToRequest({ id: helpRequest.id }))
        .then(unwrapResult) // Обрабатываем успешный результат
        .then(() => {
          toast.success('Успех! Спасибо за помощь!');
        }); 
    }
  };

  return { handleContributeToRequest };
};

export default useContributeToRequest;
