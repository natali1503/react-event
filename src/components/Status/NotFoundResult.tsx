import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

const NotFoundResult: FC = () => {
  return (
    <Box
      display={'flex'}
      height={'100%'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
    >
      <ReactSVG src='/img/notFoundResult.svg' />
      <Typography variant='h5'>Запросы не найдены</Typography>
    </Box>
  );
};

export default NotFoundResult;
