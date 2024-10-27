import { Box, Link, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

import vk from '/img/vk.png';
import tg from '/img/telegram.png';
import wh from '/img/whatsapp.png';

export default function Contacts() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'30px'}>
      <Stack gap={'10px'} alignItems={'flex-start'}>
        <Typography variant="h6">E-mail</Typography>
        <Typography>{data.contacts.email}</Typography>
      </Stack>
      <Stack gap={'10px'} alignItems={'flex-start'}>
        <Typography variant="h6">Телефон</Typography>
        <Typography>{data.contacts.phone}</Typography>
      </Stack>
      <Stack gap={'10px'} alignItems={'flex-start'}>
        <Typography variant="h6">Социальные сети</Typography>
        <Stack gap={'6px'}>
          <ItemSocial
            name="Vkontakte"
            link={`https://vk.com/${data.contacts.social.vk}`}
            img={vk}
          />
          <ItemSocial
            name="Telegram"
            link={`https://t.me/${data.contacts.social.telegram}`}
            img={tg}
          />
          <ItemSocial
            name="Whatsapp"
            link={`https://wa.me/${data.contacts.social.whatsapp}`}
            img={wh}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

interface IItemSocial {
  name: string;
  link: string;
  img: string;
}

const ItemSocial = ({ name, link, img }: IItemSocial) => {
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
      <Link href={`#${link}`}>{name}</Link>
    </Stack>
  );
};
