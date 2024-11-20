import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function Logo() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <ReactSVG
        src="/img/LeftSide.svg"
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: 'calc(31.3rem + 0.11*(100vw - 192rem))',
        }}
      />
    </Box>
  );
}
