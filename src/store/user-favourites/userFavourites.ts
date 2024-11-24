import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpRequest } from '../../types/HelpRequest';
import { addToFavouritesAction, getFavouritesAction, removeFromFavouritesAction } from '../api-actions';

export const userFavouritesSlice = createSlice({
  name: 'userFavourites',
  initialState: {
    isData: false,
    isLoading: false,
    isFavouriteRequests: false,
    favouriteRequests: <string[]>[],
    helpRequest: <HelpRequest[]>[],
    favouriteHelp: <HelpRequest[]>[],
    error: '',
  },
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.favouriteRequests = action.payload;
      state.isFavouriteRequests = true;
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
    builder
    // Handle the "getFavouritesAction" states
      .addCase(getFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.isData = false;
      })
      .addCase(getFavouritesAction.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.isLoading = false;
        state.isData = true;
        state.favouriteRequests = action.payload;
      })
      .addCase(getFavouritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = false;
        state.error = (action.payload as string) || 'Failed to fetch favourites';
      });

    builder
      // Handle the "addToFavouritesAction" states
      .addCase(addToFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.isData = false;
      })
      .addCase(addToFavouritesAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isData = true;
        const idToAdd = action.payload;
        state.favouriteRequests = [
          ...new Set([...state.favouriteRequests, ...idToAdd]),
        ];
      })
      .addCase(addToFavouritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = false;
        state.error = action.payload as string || 'Failed to add to favourites';
    });

    builder
    // Handle the "removeFromFavouritesAction" states
      .addCase(removeFromFavouritesAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.isData = false;
      })
      .addCase(removeFromFavouritesAction.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isData = true;
        const idToDelete = action.payload;
        state.favouriteRequests = state.favouriteRequests.filter(id => id !== idToDelete);
      })
      .addCase(removeFromFavouritesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = false;
        state.error = (action.payload as string) || 'Failed to remove from favourites';
      });
  },
});

export default userFavouritesSlice.reducer;
export const { setFavourites, setHelpRequest, setFavouriteHelp, setIsLoading } = userFavouritesSlice.actions;
