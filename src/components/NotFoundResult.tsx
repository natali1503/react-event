import { Box, Typography } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function NotFoundResult() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
    >
      <ReactSVG src="../../public/img/notFoundResult.svg" />
      <Typography variant="h5">Запросы не найдены</Typography>
    </Box>
  );
}
