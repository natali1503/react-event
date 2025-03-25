import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

const NotFoundResult: FC = () => {
  return (
    <Box
      display={'flex'}
      height={'100%'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'2rem'}
    >
      <ReactSVG
        src='/img/notFoundResult.svg'
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: '100%',
          maxWidth: '262px',
        }}
      />
      <Typography variant='h5' textAlign={'center'}>
        Запросы не найдены
      </Typography>
    </Box>
  );
};

export default NotFoundResult;
