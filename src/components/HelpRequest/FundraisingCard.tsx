import { Box, Paper, Typography } from '@mui/material';
import { FC } from 'react';

import { formatDate } from '../../utils/formatUtils';
import useContributeToRequest from '../../hooks/useContributeToRequest';
import { IHelpRequest } from '../../types/IHelpRequest';
import { useMode } from '../../theme';
import { useBreakpointOverlap } from '../../hooks/useBreakpointOverlap';

import DonationStatusCard from './DonationStatusCard';

interface IRequestProps {
  helpRequest: IHelpRequest;
}

const FundraisingCard: FC<IRequestProps> = ({ helpRequest }) => {
  const { goalDescription, endingDate, contributorsCount, requestGoalCurrentValue, requestGoal } = helpRequest;
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  const [theme] = useMode();
  const breakpointOverlap = theme.breakpoints.values.sm;
  const { isBreakpointOverlap } = useBreakpointOverlap({
    breakpointOverlapExpression: () => window.innerWidth <= breakpointOverlap && window.innerWidth >= 360,
  });

  return (
    <Paper sx={{ padding: '1.5rem' }}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }} mb={'10px'}>
        Вместе для добрых дел
      </Typography>
      <Box
        display={'flex'}
        flexDirection={isBreakpointOverlap ? 'row' : 'column'}
        justifyContent={'space-between'}
        gap={'2rem'}
      >
        <Box display={'flex'} gap={'2rem'} flexDirection={'column'}>
          <Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Цель сбора
            </Typography>
            <Typography variant='body2'>{goalDescription}</Typography>
          </Box>

          <Box>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              Завершение
            </Typography>
            <Typography variant='body2'>{formatDate(endingDate)}</Typography>
          </Box>
        </Box>
        <DonationStatusCard
          contributorsCount={contributorsCount}
          requestGoalCurrentValue={requestGoalCurrentValue}
          requestGoal={requestGoal}
          handleDonation={handleContributeToRequest}
        />
      </Box>
    </Paper>
  );
};

export default FundraisingCard;
