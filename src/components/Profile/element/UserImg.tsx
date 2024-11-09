import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function UserImg() {
  return (
    <Box display={'flex'} padding={'40px 50px'}>
      <ReactSVG src="../../public/img/profile.svg" />
    </Box>
  );
}
