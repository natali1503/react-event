import { RootState } from '../types';

export const getFavouriteIDs = ((state: RootState): string[] => {
  return state['favourites'].favouriteRequests;
});