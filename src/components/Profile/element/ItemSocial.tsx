import { Stack, Box, Link } from '@mui/material';

interface IItemSocial {
  name: string;
  link: string;
  icon: JSX.Element;
}

export const ItemSocial = ({ name, link, icon }: IItemSocial) => {
  return (
    <Stack display={'flex'} direction={'row'} gap={'32px'} alignItems={'center'}>
      <Box width={'24px'} height={'24px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ width: '100%', height: '100%', objectFit: 'contain' }}>{icon}</Box>
      </Box>
      <Link
        href={`${link}`}
        target='_blank'
        underline='hover'
        sx={{
          color: 'black',
          '&:hover': { color: 'black' },
        }}
      >
        {name}
      </Link>
    </Stack>
  );
};
