import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/authorization';
import { UserImg } from './element/UserImg';
import { useMode } from '../../theme';

export default function CardProfile() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });
  const [theme] = useMode();
  const dispatch = useDispatch();
  function handleClick() {
    //вызывать функцию для удаления токена
    dispatch(logOut());
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      minWidth={'calc(32rem-0.017*(100vw - 192rem))'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
      }}
    >
      <UserImg />
      <Divider />
      <Stack>
        <Stack
          marginBottom={'10px'}
          marginTop={'20px'}
          alignItems={'flex-start'}
        >
          <Typography variant="h6" marginLeft={'20px'}>
            {data.name} {data.lastName}
          </Typography>
        </Stack>

        <Stack
          marginLeft={'20px'}
          direction={'row'}
          gap={'4px'}
          marginBottom={'50px'}
        >
          <Typography fontSize={14} fontWeight={500}>
            Статус:
          </Typography>
          <Typography fontSize={14}> {data.status}</Typography>
        </Stack>
      </Stack>

      <Stack margin={'0 20px'} marginBottom={'20px'} justifyContent={'center'}>
        <Button
          variant="outlined"
          sx={{
            color: '#000',
            border: '1px solid #000',
          }}
          onClick={handleClick}
        >
          Выйти из аккаунта
        </Button>
      </Stack>
    </Box>
  );
}
