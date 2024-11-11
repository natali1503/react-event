import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { HelpRequest } from '../../types/HelpRequest';
import { formatDate, formatNumber, formatString } from '../../helper-functions/helper-functions';
import { Star, StarBorder } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/types';
import { addToFavouritesAction, getUser, removeFromFavouritesAction } from '../../store/api-actions';

type CardItemProps = {
  helpRequest: HelpRequest;
  orientation: string;
  keyValue: string;
};

const CardItem: FC<CardItemProps> = (props) => {
  const { helpRequest, orientation } = props;
  const dispatch = useDispatch<AppDispatch>();

  const userFavourites = useSelector((state: RootState) => {
    return state.favourites;
  });

  const handleAddToFavourites = (favouriteId: string) => {
    dispatch(addToFavouritesAction(favouriteId));
    dispatch(getUser())
  };

  const handleRemoveFavourite = (favouriteId: string) => {
    dispatch(removeFromFavouritesAction(favouriteId));
    dispatch(getUser())
  };

  const userFavouriteId = userFavourites.favouriteRequests;
  const isFavourite = userFavouriteId.some(favId => favId === helpRequest.id);
  console.log(userFavouriteId, ' comparing with: ', helpRequest.id, ' result: ', isFavourite);

  return (
      <Card sx={{ 
        display: 'flex', 
        marginTop: orientation === 'horizontal' ? '20px' : '20px',
        boxShadow: orientation === 'horizontal' ? 'none' : '',
        borderBottom: orientation === 'horizontal' ? '1px solid #0000001F' : '',
        borderRadius: orientation === 'horizontal' ? '0px' : '',
        width: orientation === 'horizontal' ? '100%' : 320,
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        padding: orientation === 'horizontal' ? '20px 0 30px 52px' : 0,
        gap: orientation === 'horizontal' ? '30px' : 0,
        }}>
        {orientation !== 'horizontal' && (<CardMedia
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
        />)}
        {orientation !== 'horizontal' ? (
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
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: 252, 
            }}>
            <CardHeader sx={{ marginBottom: '30px', padding: 0 }}
              title={formatString(helpRequest.title)}
            />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
              <LinearProgress variant="determinate" value={helpRequest.requestGoal / helpRequest.requestGoalCurrentValue * 100} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Typography variant="body2">{formatNumber(helpRequest.requestGoal)} руб</Typography> {/* Поменяла местами, т.к значения в бд неверные */}
                <Typography variant="body2">{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
              </Box>
            </Stack>
            <CardActions disableSpacing sx={{ padding: 0, textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                Нас уже: {formatNumber(helpRequest.contributorsCount)}
              </Typography>
              <Button href="/user:id" size="large" variant="contained" color="primary" fullWidth>Помочь</Button>
            </CardActions>
          </Box>
        )}

        <Divider component="div" />
        <CardContent sx={{ 
          padding: orientation !== 'horizontal' ? '10px 16px' : 0,
          textAlign: 'left',
          flex: orientation == 'horizontal' ? 2 : 0,
          display: orientation == 'horizontal' ? 'grid' : 'block', 
          gridTemplateColumns: orientation == 'horizontal' ? 'repeat(2, 1fr)' : 'none', 
          gap:  orientation == 'horizontal' ? '30px' : 0,
          maxWidth:  orientation == 'horizontal' ? '512px' : 'none',
          
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

          <Stack spacing={0.5} sx={{ marginBottom: '20px',
            order: orientation === 'horizontal' ? 1 : 'initial' 
           }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
            <Typography variant="body2">{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
            <Typography variant="body2">{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>

          {orientation !== 'horizontal' && <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
            <LinearProgress variant="determinate" value={helpRequest.requestGoal / helpRequest.requestGoalCurrentValue * 100} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoal)} руб</Typography> {/* Поменяла местами, т.к значения в бд неверные */}
              <Typography variant="body2">{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
            </Box>
          </Stack>}   
        </CardContent>
        {orientation !== 'horizontal' ? (<CardActions disableSpacing sx={{ padding: '0 16px 20px', textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start', marginTop: 'auto'}}>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>Нас уже: {formatNumber(helpRequest.contributorsCount)}</Typography>
            <Button href="/user:id" size="large" variant="contained" color="primary" fullWidth>Помочь</Button>
          </CardActions>)
          : <Button
              variant="outlined"
              size="small"
              startIcon={<StarBorderIcon />}
              sx={{ minWidth: 'fit-content', alignSelf: 'flex-start', textTransform: 'none', borderBlockColor: 'rgba(0, 0, 0, 0.2)', color: '#000000'}}
            >
              В избранное
            </Button>
        }
      </Card>
  );
}

export default CardItem;