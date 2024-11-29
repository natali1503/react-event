import { Typography, Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

const NotFoundPage = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
      width={'100%'}
    >
      <ReactSVG src="/img/notFoundResult.svg" />
      <Typography variant="h5">Страница не найдена</Typography>
    </Box>
  );
};

export default NotFoundPage;
