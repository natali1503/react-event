import { CircularProgress, IconButton } from '@mui/material';
import { IFavouriteButton } from '../../../types/IFavouriteButton';

type FavouriteIconButtonProps = IFavouriteButton;

const FavouriteIconBtn = (props: FavouriteIconButtonProps) => {
  const { handleToggleFavourite, favouriteIcon, ariaLabel, isLoading } = props;

  return (
    <IconButton
      aria-label={ariaLabel}
      disabled={isLoading}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        handleToggleFavourite();
      }}
    >
      {isLoading ? <CircularProgress size={22} /> : favouriteIcon}
    </IconButton>
  );
};

export default FavouriteIconBtn;
