import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';
import { useBreakpointOverlap } from '../../hooks/useBreakpointOverlap';

export function Logo() {
  const { breakpointOverlap } = useBreakpointOverlap();
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexGrow={'1'}>
      <ReactSVG
        src="/img/LeftSide.svg"
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: `${breakpointOverlap ? 'calc(12rem ' : 'calc(31.3rem + 0.11*(100vw - 192rem))'}`,
        }}
      />
    </Box>
  );
}
