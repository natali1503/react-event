
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