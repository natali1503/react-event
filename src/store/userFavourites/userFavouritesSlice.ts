import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addToFavouritesAction, getFavouritesAction, removeFromFavouritesAction } from '../apiActions';
import { IHelpRequest } from '../../types/IHelpRequest';

export const userFavouritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    isData: false,
    isLoading: false,
    isFavouriteRequestsLoaded: false,
    favouriteRequests: <string[]>[],
    helpRequest: <IHelpRequest[]>[],
    favouriteHelp: <IHelpRequest[]>[],
    isFavouritesListError: false,
  },
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      if (!state.isFavouriteRequestsLoaded) {
        state.favouriteRequests = action.payload;
        state.isFavouriteRequestsLoaded = true;
        state.isFavouritesListError = false;
      }
    },
    setHelpRequest(state, action: PayloadAction<IHelpRequest[]>) {
      state.helpRequest = action.payload;
    },
    setFavouriteHelp(state, action: PayloadAction<IHelpRequest[]>) {
      state.favouriteHelp = action.payload;
      state.isLoading = false;
      state.isData = true;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    resetFavouriteRequestsError: (state) => {
      state.isFavouritesListError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.isFavouritesListError = false;
        state.isData = false;
      })
      .addCase(getFavouritesAction.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.isLoading = false;
        state.isData = true;
        state.isFavouritesListError = false;
        if (!state.isFavouriteRequestsLoaded) {
          state.favouriteRequests = action.payload;
          state.isFavouriteRequestsLoaded = true;
        }
      })
      .addCase(getFavouritesAction.rejected, (state) => {
        state.isLoading = false;
        state.isData = false;
        state.isFavouritesListError = true;
      })
      .addCase(addToFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.isData = false;
      })
      .addCase(addToFavouritesAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isData = true;
        const idToAdd = action.payload;
        state.favouriteRequests = [...new Set([...state.favouriteRequests, idToAdd])];
      })
      .addCase(addToFavouritesAction.rejected, (state) => {
        state.isLoading = false;
        state.isData = false;
      })
      .addCase(removeFromFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.isData = false;
      })
      .addCase(removeFromFavouritesAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isData = true;
        const idToDelete = action.payload;
        state.favouriteRequests = state.favouriteRequests.filter((id) => id !== idToDelete);
      })
      .addCase(removeFromFavouritesAction.rejected, (state) => {
        state.isLoading = false;
        state.isData = false;
      });
  },
});

export default userFavouritesSlice.reducer;
export const { setFavourites, setHelpRequest, setFavouriteHelp, setIsLoading, resetFavouriteRequestsError } =
  userFavouritesSlice.actions;
