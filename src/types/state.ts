import { IHelpRequest } from './helpRequest';

export interface HelpRequestData {
  helpRequestsList: IHelpRequest[];
  isRequestsDataLoading: boolean;
  hasError: boolean;
  isСontributionPostingStatus: boolean;
  request: IHelpRequest | null;
  isRequestDataLoading: boolean;
  hasHelpRequestError: boolean;
}
