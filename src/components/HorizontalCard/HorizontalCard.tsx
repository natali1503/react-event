import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { HelpRequest } from '../../types/HelpRequest';
import { formatDate, formatString } from '../../helper-functions/helper-functions';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { getFavouriteRequestsIDs } from '../../store/user-favourites/favourites-selectors';
import DonationStatusCard from '../HelpRequest/DonationStatusCard';

interface ICardItemProps {
  helpRequest: HelpRequest;
}

const HorizontalCard: FC<ICardItemProps> = (props) => {
  const { helpRequest } = props;
  const userFavouritesIDs = useSelector(getFavouriteRequestsIDs);
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Card
      sx={{
        display: 'flex',
        marginTop: '20px',
        boxShadow: 'none',
        borderBottom: '1px solid #0000001F',
        borderRadius: '0px',
        width: '100%',
        flexDirection: 'row',
        padding: '20px 0 30px 52px',
        gap: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 252,
        }}
      >
        <CardHeader sx={{ marginBottom: '30px', padding: 0 }} title={formatString(helpRequest.title)} />
        <DonationStatusCard
          contributorsCount={helpRequest.contributorsCount}
          requestGoalCurrentValue={helpRequest.requestGoalCurrentValue}
          requestGoal={helpRequest.requestGoal}
          handleDonation={handleContributeToRequest}
        />
      </Box>

      <Divider component='div' />
      <CardContent
        sx={{
          padding: 0,
          textAlign: 'left',
          flex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '30px',
          maxWidth: '512px',
        }}
      >
        <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Организатор
          </Typography>
          <Typography variant='body2'>{helpRequest.organization.title}</Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Локация
          </Typography>
          <Typography variant='body2'>{helpRequest.location.district}</Typography>
          <Typography variant='body2'>Населенный пункт: {helpRequest.location.city}</Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ marginBottom: '20px', order: 1 }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Цель сбора
          </Typography>
          <Typography variant='body2'>{helpRequest.goalDescription}</Typography>
        </Stack>

        <Stack spacing={0.5} sx={{ marginBottom: '20px' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Завершение
          </Typography>
          <Typography variant='body2'>{formatDate(helpRequest.endingDate)}</Typography>
        </Stack>
      </CardContent>
      <FavouriteButton
        format={'horizontal'}
        helpRequest={helpRequest}
        favouriteRequestsIDs={userFavouritesIDs}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Card>
  );
};

export default HorizontalCard;
