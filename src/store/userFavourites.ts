import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HelpRequest } from '../types/HelpRequest';

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
});

export default userFavouritesSlice.reducer;
export const { setFavourites, setHelpRequest, setFavouriteHelp, setIsLoading } =
  userFavouritesSlice.actions;
