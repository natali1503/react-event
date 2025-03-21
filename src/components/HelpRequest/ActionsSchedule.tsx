import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FC } from 'react';

interface IActionsSchedule {
  actionsSchedule: { stepLabel?: string; isDone?: boolean }[];
}

const ActionsSchedule: FC<IActionsSchedule> = ({ actionsSchedule }) => {
  return (
    <Box>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }} mb={'10px'}>
        План действий
      </Typography>

      <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
        {actionsSchedule.map((action) => {
          return (
            <Box key={action.stepLabel} display={'flex'} alignItems={'center'} gap={'4px'}>
              <CheckCircleOutlineIcon
                fontSize='medium'
                sx={{ color: action.isDone ? 'success.light' : 'action.disabled' }}
              />
              <Typography variant='body2' lineHeight={'100%'}>
                {action.stepLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ActionsSchedule;
