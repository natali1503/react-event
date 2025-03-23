import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

const ErrorComponent: FC = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
      height={'100%'}
    >
      <ReactSVG src='/img/noDataError.svg' />
      <Typography variant='h5'>Ошибка! Не удалось загрузить информацию</Typography>
    </Box>
  );
};

export default ErrorComponent;
