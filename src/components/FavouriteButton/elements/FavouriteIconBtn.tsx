import { CircularProgress, IconButton } from '@mui/material';
import { IFavouriteButton } from '../../../types/IFavouriteButton';

type FavouriteIconButtonProps = IFavouriteButton;

const FavouriteIconBtn = (props: FavouriteIconButtonProps) => {
  const { handleToggleFavourite, favouriteIcon, ariaLabel, isLoading } = props;

  return (
    <IconButton
      onClick={handleToggleFavourite}
      aria-label={ariaLabel}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} /> : favouriteIcon}
    </IconButton>
  );
};

export default FavouriteIconBtn;
