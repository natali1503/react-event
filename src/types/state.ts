import { HelpRequest } from './HelpRequest';

export interface HelpRequestData {
  helpRequestsList: HelpRequest[];
  isRequestsDataLoading: boolean;
  hasError: boolean;
  isСontributionPostingStatus: boolean;
  request: HelpRequest | null;
  isRequestDataLoading: boolean;
  hasHelpRequestError: boolean;
}
