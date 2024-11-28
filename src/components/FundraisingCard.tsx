import { Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { HelpRequest } from '../types/HelpRequest';
import { FC } from 'react';
import { formatDate, formatNumber } from '../helper-functions/helper-functions';
import useContributeToRequest from '../hooks/useContributeToRequest';

type RequestProps = {
  helpRequest: HelpRequest;
};

const FundraisingCard: FC<RequestProps> = ({ helpRequest }) => {
  const { goalDescription, endingDate, contributorsCount, requestGoalCurrentValue, requestGoal } = helpRequest;
  const { handleContributeToRequest } = useContributeToRequest(helpRequest);
  
  return (
    <Paper sx={{maxWidth: '320px', padding: '1.5rem'}}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }} mb={'10px'}>Вместе для добрых дел</Typography>

      <Stack spacing={2} sx={{margin: '0 0 40px'}}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Цель сбора</Typography>
          <Typography variant="body2">{goalDescription}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Завершение</Typography>
          <Typography variant="body2">{formatDate(endingDate)}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Мы собрали</Typography>
          <LinearProgress variant="determinate" value={Math.min((helpRequest.requestGoalCurrentValue / helpRequest.requestGoal) * 100, 100)}  />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
            <Typography variant="body2">{formatNumber(requestGoalCurrentValue)} руб</Typography>
            <Typography variant="body2">{formatNumber(requestGoal)} руб</Typography>
          </Box>
        </Box>
      </Stack>

      <Box>
        <Typography variant="body2" sx={{ marginBottom: '10px', color: 'text.secondary' }}>Нас уже: {formatNumber(contributorsCount)}</Typography>
        <Button size="large" variant="contained" color="primary" fullWidth onClick={() => handleContributeToRequest()}>Помочь</Button>
      </Box>
    </Paper>
  )
}

export default FundraisingCard