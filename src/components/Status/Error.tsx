import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

const Error: FC = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'2rem'}
      height={'100%'}
    >
      <ReactSVG
        src='/img/noDataError.svg'
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      />
      <Typography variant='h5' textAlign={'center'}>
        Ошибка! Не удалось загрузить информацию
      </Typography>
    </Box>
  );
};

export default Error;
