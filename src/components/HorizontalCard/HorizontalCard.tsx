import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { HelpRequest } from '../../types/HelpRequest';
import { formatDate, formatNumber, formatString } from '../../helper-functions/helper-functions';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import { Star } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/types';
import { addToFavouritesAction, getFavouritesAction, removeFromFavouritesAction } from '../../store/api-actions';
import { useSelector } from 'react-redux';

type CardItemProps = {
  helpRequest: HelpRequest;
};

const HorizontalCard: FC<CardItemProps> = (props) => {
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
      <Card sx={{ 
        display: 'flex', 
        marginTop: '20px',
        boxShadow: 'none',
        borderBottom: '1px solid #0000001F',
        borderRadius:'0px',
        width:'100%',
        flexDirection: 'row',
        padding:'20px 0 30px 52px',
        gap: '30px',
        }}>
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
            <LinearProgress variant="determinate" value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}  />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoalCurrentValue)} руб</Typography>
              <Typography variant="body2">{formatNumber(helpRequest.requestGoal)} руб</Typography>
            </Box>
          </Stack>
          <CardActions disableSpacing sx={{ padding: 0, textAlign: 'left', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ marginBottom: '10px' }}>
              Нас уже: {formatNumber(helpRequest.contributorsCount)}
            </Typography>
            <Button href="/user:id" size="large" variant="contained" color="primary" fullWidth onClick={() => handleContributeToRequest()}>Помочь</Button>
          </CardActions>
        </Box>
        
        <Divider component="div" />
        <CardContent sx={{ 
          padding: 0,
          textAlign: 'left',
          flex: 2,
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap:  '30px',
          maxWidth:  '512px',
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
            order: 1 
           }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
            <Typography variant="body2">{helpRequest.goalDescription}</Typography>
          </Stack>

          <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
            <Typography variant="body2">{formatDate(helpRequest.endingDate)}</Typography>
          </Stack>
        </CardContent>
         <Button
              variant="outlined"
              size="small"
              onClick={() => (isFavourite ? handleRemoveFavourite(helpRequest.id) : handleAddToFavourites(helpRequest.id))}
              startIcon={isFavourite? <Star /> : <StarBorderIcon />}

              sx={{ minWidth: 'fit-content', alignSelf: 'flex-start', textTransform: 'none', borderBlockColor: 'rgba(0, 0, 0, 0.2)', color: '#000000'}}
            >
               {isFavourite ? 'Удалить избранное' : 'В избранное'}
          </Button>
      </Card>
  );
}

export default HorizontalCard;