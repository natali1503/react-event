import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import { formatDate, formatNumber, formatString } from '../../helper-functions/helper-functions';
import { Link } from 'react-router-dom';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { getFavouriteRequestsIDs } from '../../store/user-favourites/favourites-selectors';
import { useSelector } from 'react-redux';

type CardItemProps = {
  helpRequest: HelpRequest;
};

const VerticalCard: FC<CardItemProps> = (props) => {
  const { helpRequest} = props;
  const userFavouritesIDs = useSelector(getFavouriteRequestsIDs);
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Link to={`/request/${helpRequest.id}`} style={{ textDecoration: 'none' }}>
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
              <FavouriteButton
                format={'vertical'}
                helpRequest = {helpRequest}
                favouriteRequestsIDs = {userFavouritesIDs}
                isLoading = {isLoading}
                setIsLoading = {setIsLoading}
              />
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
            <Button size="large" variant="contained" color="primary" fullWidth 
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                handleContributeToRequest();
              }}>Помочь</Button>
          </CardActions>
      </Card>
    </Link>
  );
}

export default VerticalCard;