import { Star, StarBorder } from '@mui/icons-material';
import { Box } from '@mui/material';
import { HelpRequest } from '../../types/HelpRequest';
import { useFavourites } from '../../hooks/useFavourites';
import FavouriteIconBtn from './elements/FavouriteIconBtn';
import FavouriteIconBtnWithText from './elements/FavouriteIconWithText';

type FavouriteButton = {
  format: string;
  favouriteRequests: string[];
  helpRequest: HelpRequest;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavouriteButton: React.FC<FavouriteButton> = (props) => {
  const { format, helpRequest, favouriteRequests, isLoading, setIsLoading } =
    props;
  const { handleAddToFavourites, handleRemoveFavourite } = useFavourites();
  const isFavourite = favouriteRequests.includes(helpRequest.id);

  const handleToggleFavourite = async () => {
    setIsLoading(true);
    try {
      if (isFavourite) {
        await handleRemoveFavourite(helpRequest.id);
      } else {
        await handleAddToFavourites(helpRequest.id);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconColor = isFavourite ? '#FFA500' : 'inherit';
  const favouriteIcon = isFavourite ? (
    <Star sx={{ color: iconColor, '&:hover': { color: '#FF7F00' } }} />
  ) : (
    <StarBorder sx={{ color: iconColor, '&:hover': { color: '#FF7F00' } }} />
  );
  const action = isFavourite ? 'Удалить' : 'Добавить';
  const buttonText = `${action} в избранное`;
  const ariaLabel = `${action} из избранного`;

  return (
    <Box>
      {format === 'vertical' ? (
        <FavouriteIconBtn
          handleToggleFavourite={handleToggleFavourite}
          favouriteIcon={favouriteIcon}
          ariaLabel={ariaLabel}
          isLoading={isLoading}
        />
      ) : (
        <FavouriteIconBtnWithText
          handleToggleFavourite={handleToggleFavourite}
          favouriteIcon={favouriteIcon}
          ariaLabel={ariaLabel}
          isLoading={isLoading}
          buttonText={buttonText}
        />
      )}
    </Box>
  );
};

export default FavouriteButton;
