import { addToFavouritesAction, removeFromFavouritesAction } from '../store/apiActions';

import { useAppDispatch } from './useAppDispatch';

export const useFavourites = () => {
  const dispatch = useAppDispatch();

  const handleAddToFavourites = async (favouriteId: string) => {
    try {
      await dispatch(addToFavouritesAction(favouriteId));
    } catch (error) {
      console.log('Ошибка добавления в избранное: ', error);
    }
  };

  const handleRemoveFavourite = async (favouriteId: string) => {
    try {
      await dispatch(removeFromFavouritesAction(favouriteId));
    } catch (error) {
      console.log('Ошибка удаления из избранного: ', error);
    }
  };

  return {
    handleAddToFavourites,
    handleRemoveFavourite,
  };
};
