import { Stack, Box, Link } from '@mui/material';

interface IItemSocial {
  name: string;
  link: string;
  img: string;
}

export const ItemSocial = ({ name, link, img }: IItemSocial) => {
  return (
    <Stack
      display={'flex'}
      direction={'row'}
      gap={'32px'}
      alignItems={'center'}
    >
      <Box
        width={'24px'}
        height={'24px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          component={'img'}
          src={img}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        ></Box>
      </Box>
      <Link href={`${link}`}>{name}</Link>
    </Stack>
  );
};
