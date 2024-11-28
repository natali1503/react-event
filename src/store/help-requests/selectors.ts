import { HelpRequest } from '../../types/HelpRequest';
import { RootState } from '../types';

export const getHelpRequests = (state: RootState): HelpRequest[] =>
  state['HELP_REQUEST'].helpRequestsList;
export const getHelpRequestInfo = (state: RootState): HelpRequest | null => state['HELP_REQUEST'].request;
export const getRequestLoadingStatus = (state: RootState): boolean => state['HELP_REQUEST'].isRequestDataLoading;