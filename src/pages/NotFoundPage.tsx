import { Typography, Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

const NotFoundPage = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'2rem'}
      width={'100%'}
    >
      <ReactSVG src='/img/notFoundResult.svg' />
      <Typography variant='h5' textAlign={'center'}>
        Страница не найдена
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
