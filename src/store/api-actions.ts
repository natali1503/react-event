
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { HelpRequest } from '../types/HelpRequest';

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[]>(
  'helpRequests/fetchHelpRequests',
  async () => {
    const response = await api.getHelpRequests();
    return response;
  }
);

export const fetchСontributeToRequest = createAsyncThunk<string, { id: string }>(
  'helpRequests/contributeToRequest',
  async ({ id }) => {
    const response = await api.contributeToRequest(id);
    return response;
  }
);
