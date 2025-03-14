import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} height={'100%'}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
