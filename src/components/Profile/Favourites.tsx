import { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { setHelpRequest, setFavouriteHelp, setIsLoading } from '../../store/userFavourites/userFavouritesSlice';
import { matchFavourites } from '../../utils/matchFavouritesUtils';
import { fetchHelpRequestsAction } from '../../store/apiActions';
import ViewHelpRequests from '../ViewHelpRequests/ViewHelpRequests';
import { VIEW_TOGGLE_OPTIONS } from '../../constants/globalConsts';
import { getHelpRequests, getRequestDataError } from '../../store/helpRequests/helpRequestsSelectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getFavourites } from '../../store/userFavourites/userFavouritesSelectors';

interface IFavourites {
  viewMode: VIEW_TOGGLE_OPTIONS;
  customNumberItemsPerPage: number;
}
const Favourites: FC<IFavourites> = ({ viewMode, customNumberItemsPerPage }) => {
  const dispatch = useAppDispatch();

  const helpRequestData = useAppSelector(getHelpRequests);
  const helpRequestDataError = useAppSelector(getRequestDataError);
  const userFavourites = useAppSelector(getFavourites);

  useEffect(() => {
    if (helpRequestData.length > 0) {
      dispatch(setHelpRequest(helpRequestData));
    } else {
      dispatch(setIsLoading());
      dispatch(fetchHelpRequestsAction());
    }
  }, [helpRequestData.length]);

  useEffect(() => {
    if (userFavourites.helpRequest.length === 0) return;

    const favouriteHelp = matchFavourites(userFavourites.helpRequest, userFavourites.favouriteRequests);
    dispatch(setFavouriteHelp(favouriteHelp));
  }, [userFavourites.helpRequest, userFavourites.favouriteRequests]);

  useEffect(() => {
    if (helpRequestDataError) dispatch(setIsLoading());
  }, [helpRequestDataError]);

  const notFoundResult = userFavourites.isData && userFavourites.favouriteRequests.length === 0;

  return (
    <Box height={'100%'} marginTop={'2rem'}>
      <ViewHelpRequests
        viewMode={viewMode}
        helpRequests={userFavourites.favouriteHelp}
        isLoading={userFavourites.isLoading}
        isHelpRequestsError={helpRequestDataError}
        notFoundResult={notFoundResult}
        customNumberItemsPerPage={customNumberItemsPerPage}
      />
    </Box>
  );
};
export default Favourites;
