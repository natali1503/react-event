import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import { fetchContributeToRequest } from '../store/api-actions';
import { HelpRequest } from '../types/HelpRequest';

import { useAppDispatch } from './useAppDispatch';

const useContributeToRequest = (helpRequest: HelpRequest | undefined) => {
  const dispatch = useAppDispatch();

  const handleContributeToRequest = () => {
    if (helpRequest) {
      dispatch(fetchContributeToRequest({ id: helpRequest.id }))
        .then(unwrapResult)
        .then(() => {
          toast.success('Успех! Спасибо за помощь!');
        });
    }
  };

  return { handleContributeToRequest };
};

export default useContributeToRequest;
