import { Button, CircularProgress } from '@mui/material';
import { IFavouriteButton } from '../../../types/IFavouriteButton';

type FavouriteIconWithTextProps = IFavouriteButton & {
  buttonText: string;
};

const FavouriteIconBtnWithText = (props: FavouriteIconWithTextProps) => {
  const {
    handleToggleFavourite,
    favouriteIcon,
    ariaLabel,
    isLoading,
    buttonText,
  } = props;

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleToggleFavourite}
      startIcon={isLoading ? <CircularProgress size={24} /> : favouriteIcon}
      aria-label={ariaLabel}
      disabled={isLoading}
      sx={{
        minWidth: 'fit-content',
        alignSelf: 'flex-start',
        textTransform: 'none',
        borderBlockColor: 'rgba(0, 0, 0, 0.2)',
        color: '#000000',
      }}
    >
      {buttonText}
    </Button>
  );
};

export default FavouriteIconBtnWithText;