import { Box } from '@mui/material';
import { ReactSVG } from 'react-svg';

export function Telegram() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={'20px'}
      height={'100%'}
    >
      <ReactSVG
        src="/img/telegram.svg"
        beforeInjection={(svg) => {
          svg.removeAttribute('width');
          svg.removeAttribute('height');
        }}
        style={{
          width: '2.4rem',
          height: '2.4rem',
        }}
      />
    </Box>
  );
}
