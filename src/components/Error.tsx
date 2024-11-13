import { Box, Typography } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function Error() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
    >
      <ReactSVG src="../../public/img/noDataError.svg" />
      <Typography variant="h5">
        Ошибка! Не удалось загрузить информацию
      </Typography>
    </Box>
  );
}
