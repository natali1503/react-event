import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function Error() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <ReactSVG src="../../public/img/noDataError.svg" />
    </Box>
  );
}
