import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { FC } from 'react';

import { formatNumber } from '../../utils/formatUtils';
interface IDonationStatusCard {
  contributorsCount: number;
  requestGoalCurrentValue: number;
  requestGoal: number;
  handleDonation: () => void;
}
const DonationStatusCard: FC<IDonationStatusCard> = ({
  requestGoalCurrentValue,
  requestGoal,
  contributorsCount,
  handleDonation,
}) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <Box display={'flex'} flexDirection={'column'} gap={'4px'} sx={{ minWidth: '130px' }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Мы собрали
          </Typography>
          <LinearProgress variant='determinate' value={Math.min((requestGoalCurrentValue / requestGoal) * 100, 100)} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body2'>{formatNumber(requestGoalCurrentValue)} руб</Typography>
            <Typography variant='body2'>{formatNumber(requestGoal)} руб</Typography>
          </Box>
        </Box>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Нас уже: {formatNumber(contributorsCount)}
        </Typography>
      </Box>
      <Button size='large' variant='contained' color='primary' fullWidth onClick={() => handleDonation()}>
        Помочь
      </Button>
    </Box>
  );
};

export default DonationStatusCard;
