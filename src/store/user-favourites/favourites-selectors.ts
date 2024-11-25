import { RootState } from '../types';

export const getFavouriteRequestsIDs = ((state: RootState) => {
  return state['favourites'].favouriteRequests;
});

export const getIsFavouriteLoading = ((state: RootState) => {
  return state['favourites'].isLoading;
});