import { Box, Typography } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function ErrorComponent() {
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
}
