import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpRequest } from '../types/HelpRequest';
import { addToFavouritesAction, removeFromFavouritesAction } from './api-actions';
import { IFavourite } from '../types/IFavourite';

export const userFavouritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    isData: false,
    isLoading: false,
    favouriteRequests: <string[]>[],
    helpRequest: <HelpRequest[]>[],
    favouriteHelp: <HelpRequest[]>[],
    error: '',
  },
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.favouriteRequests = action.payload;
    },
    setHelpRequest(state, action: PayloadAction<HelpRequest[]>) {
      state.helpRequest = action.payload;
    },
    setFavouriteHelp(state, action: PayloadAction<HelpRequest[]>) {
      state.favouriteHelp = action.payload;
      console.log(state.favouriteHelp);
      state.isLoading = false;
      state.isData = true;
    },
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
  extraReducers: (builder) => {
    // Handle the "addToFavouritesAction" states
    builder
      .addCase(addToFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.isData = false;
      })
      .addCase(addToFavouritesAction.fulfilled, (state, action: PayloadAction<IFavourite[]>) => {
        state.isLoading = false;
        state.isData = true;
        state.favouriteRequests = action.payload.map(fav => fav.id);
      })
      .addCase(addToFavouritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = false;
        state.error = action.payload as string || 'Failed to add to favourites';
      });

    // Handle the "removeFromFavouritesAction" states
    builder
      .addCase(removeFromFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.isData = false;
      })
      .addCase(removeFromFavouritesAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isData = true;
        state.favouriteRequests = state.favouriteRequests.filter(id => id !== action.payload);
      })
      .addCase(removeFromFavouritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = false;
        state.error = action.payload as string || 'Failed to remove from favourites';
      });
  },
});

export default userFavouritesSlice.reducer;
export const { setFavourites, setHelpRequest, setFavouriteHelp, setIsLoading } = userFavouritesSlice.actions;