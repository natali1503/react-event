import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import { fetchContributeToRequest } from '../store/apiActions';
import { IHelpRequest } from '../types/helpRequest';

import { useAppDispatch } from './useAppDispatch';

const useContributeToRequest = (helpRequest: IHelpRequest | undefined) => {
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
