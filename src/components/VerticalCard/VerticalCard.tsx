import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import { formatDate, formatNumber, formatString } from '../../helper-functions/helper-functions';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/types';
//import { Link } from 'react-router-dom';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import { Star, StarBorder } from '@mui/icons-material';
import { addToFavouritesAction, getFavouritesAction, removeFromFavouritesAction } from '../../store/api-actions';
import { useSelector } from 'react-redux';

type CardItemProps = {
  helpRequest: HelpRequest;
};

const VerticalCard: FC<CardItemProps> = (props) => {
  const { helpRequest} = props;
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const dispatch = useDispatch<AppDispatch>();
  const userFavourites = useSelector((state: RootState) => state.favourites);
  const isFavourite = userFavourites.favouriteRequests.includes(helpRequest.id);

  const handleAddToFavourites = async (favouriteId: string) => {
    await dispatch(addToFavouritesAction(favouriteId));
    dispatch(getFavouritesAction());
  };

  const handleRemoveFavourite = async (favouriteId: string) => {
    await dispatch(removeFromFavouritesAction(favouriteId));
    dispatch(getFavouritesAction());
  };

  return (
    //<Link to={`/request/${helpRequest.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
        display: 'flex', 
        marginTop: '20px',
        width: 320,
        flexDirection: 'column',
        padding: 0,
        gap: 0,
        }}>
        <CardMedia
          sx={{ height: 220, width: 220, margin: '0 auto' }}
          image={
            helpRequest.requesterType === 'organization'
              ? '/img/organization.svg'
              : helpRequest.requesterType === 'person' && helpRequest.helpType === 'finance'
              ? '/img/person-finance.svg'
              : helpRequest.requesterType === 'person' && helpRequest.helpType === 'material'
              ? '/img/person-material.svg'
              : '/img/organization.svg' // default
          }
          title={helpRequest.requesterType }
        />
     
        <CardHeader 
            sx={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              justifyContent: 'space-between', 
              padding: '16px', 
              textAlign: 'left', 
              minHeight: '128px',
              width: '100%',
            }} 
            title={formatString(helpRequest.title)}
            action={
              <IconButton
                onClick={() => (isFavourite ? handleRemoveFavourite(helpRequest.id) : handleAddToFavourites(helpRequest.id))}
                aria-label={isFavourite ? 'remove from favourites' : 'add to favourites'}
                disabled={userFavourites.isLoading}
              >
                {userFavourites.isLoading ? (
                  <CircularProgress size={24} />
                ) : isFavourite ? (
                  <Star /> 
                ) : (
                  <StarBorder />
                )}
              </IconButton>
            } 
        />
        <Divider component="div" />
        <CardContent sx={{ 
          padding: '10px 16px',
          textAlign: 'left',
          flex: 0,
          display: 'block', 
          gridTemplateColumns: 'none', 
          gap: 0,
          maxWidth: 'none',
          }}>
          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Организатор</Typography>
            <Typography variant="body2">{helpRequest.organization.title}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Локация</Typography>
            <Typography variant="body2">{helpRequest.location.district}</Typography>
            <Typography variant="body2">Населенный пункт: {helpRequest.location.city}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
            <Typography variant="body2">{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
            <Typography variant="body2">{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
            <LinearProgress variant="determinate" value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}  />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoal)} руб</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions disableSpacing sx={{ padding: '0 16px 20px', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto'}}>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>Нас уже: {formatNumber(helpRequest.contributorsCount)}</Typography>
            <Button size="large" variant="contained" color="primary" fullWidth onClick={() => handleContributeToRequest()}>Помочь</Button>
          </CardActions>
      </Card>
    //</Link>
  );
}

export default VerticalCard;