import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpRequest } from '../../types/HelpRequest';
import { addToFavouritesAction, getFavouritesAction, removeFromFavouritesAction } from '../api-actions';

export const userFavouritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    isData: false,
    isLoading: false,
    isFavouriteRequestsLoaded: false,
    favouriteRequests: <string[]>[],
    helpRequest: <HelpRequest[]>[],
    favouriteHelp: <HelpRequest[]>[],
    error: '',
    isFavoritesListError: false,
  },
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      if (!state.isFavouriteRequestsLoaded) {
        state.favouriteRequests = action.payload;
        state.isFavouriteRequestsLoaded = true;
      } 
    },
    setHelpRequest(state, action: PayloadAction<HelpRequest[]>) {
      state.helpRequest = action.payload;
    },
    setFavouriteHelp(state, action: PayloadAction<HelpRequest[]>) {
      state.favouriteHelp = action.payload;
      state.isLoading = false;
      state.isData = true;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the "getFavouritesAction" states
      .addCase(getFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.isFavoritesListError = false;
        state.isData = false;
      })
      .addCase(getFavouritesAction.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.isLoading = false;
        state.isData = true;
        state.isFavoritesListError = false;
        if (!state.isFavouriteRequestsLoaded) {
          state.favouriteRequests = action.payload;
          state.isFavouriteRequestsLoaded = true;
        }
      })
      .addCase(getFavouritesAction.rejected, (state) => {
        state.isLoading = false;
        state.isData = false;
        state.isFavoritesListError = true;
      })
      .addCase(addToFavouritesAction.pending, (state) => {
        state.isLoading = true;
        //state.error = ''; // TODO: использовать для каждого действия свой флаг
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
        //state.error = (action.payload as string) || 'Failed to add to favourites'; // TODO: использовать для каждого действия свой флаг
      })
      .addCase(removeFromFavouritesAction.pending, (state) => {
        state.isLoading = true;
        //state.error = ''; // TODO: использовать для каждого действия свой флаг
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
        //state.error = (action.payload as string) || 'Failed to remove from favourites'; // TODO: использовать для каждого действия свой флаг
      });
  },
});

export default userFavouritesSlice.reducer;
export const { setFavourites, setHelpRequest, setFavouriteHelp, setIsLoading } = userFavouritesSlice.actions;
