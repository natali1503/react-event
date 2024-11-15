import { HelpRequest } from '../../types/HelpRequest';
import { RootState } from '../types';

export const getHelpRequests = (state: RootState): HelpRequest[] =>
  state['HELP_REQUEST'].helpRequestsList;

export const getFavouritesIDs = (state: RootState): string[] =>
  state['favourites'].favouriteRequests;
