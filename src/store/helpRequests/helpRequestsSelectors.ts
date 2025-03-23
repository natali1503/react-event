import { IHelpRequest } from '../../types/IHelpRequest';
import { RootState } from '../types';

export const getHelpRequests = (state: RootState): IHelpRequest[] => state['HELP_REQUEST'].helpRequestsList;
export const getHelpRequestInfo = (state: RootState): IHelpRequest | null => state['HELP_REQUEST'].request;
export const getRequestLoadingStatus = (state: RootState): boolean => state['HELP_REQUEST'].isRequestDataLoading;
export const getIsRequestLoading = (state: RootState): boolean => state['HELP_REQUEST'].isRequestsDataLoading;
export const getRequestDataError = (state: RootState): boolean => state['HELP_REQUEST'].hasError;
export const getHelpRequestError = (state: RootState): boolean => state['HELP_REQUEST'].hasHelpRequestError;
