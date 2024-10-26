import { createAsyncThunk } from "@reduxjs/toolkit";
import { HelpRequest } from "../types/HelpRequest";
import { AppDispatch, RootState } from "./types";
import { APIRoute } from "../const/const";
import { AxiosInstance } from 'axios';

export const fetchHelpRequestsAction = createAsyncThunk<HelpRequest[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchHelpRequests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<HelpRequest[]>(APIRoute.HelpRequests);
    return data;
  },
);