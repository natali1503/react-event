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
      variant='outlined' 
      size='small'
      onClick={handleToggleFavourite}
      startIcon={isLoading ? <CircularProgress size={18} /> : favouriteIcon}
      aria-label={ariaLabel}
      disabled={isLoading}
      sx={{
        minWidth: 'fit-content',
        height: 'fit-content',
        alignSelf: 'flex-start',
        fontSize: '1.4rem',
        fontWeight: '400',
        textTransform: 'none',
        color: '#000',
        border: '1px solid #000',
      }}
    >
      {buttonText}
    </Button>
  );
};

export default FavouriteIconBtnWithText;