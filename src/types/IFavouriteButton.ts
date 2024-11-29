export interface IFavouriteButton {
  handleToggleFavourite: () => Promise<void>, 
  favouriteIcon: JSX.Element,
  ariaLabel: string, 
  isLoading: boolean
}