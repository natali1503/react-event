import { IHelpRequest } from './IHelpRequest';

export interface IHelpRequestData {
  helpRequestsList: IHelpRequest[];
  isRequestsDataLoading: boolean;
  hasError: boolean;
  isContributionPostingStatus: boolean;
  request: IHelpRequest | null;
  isRequestDataLoading: boolean;
  hasHelpRequestError: boolean;
}
