import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import img from '/img/Vector.png';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/authorization';

export default function CardProfile() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });
  const dispatch = useDispatch();
  function handleClick() {
    //вызывать функцию для удаления токена
    dispatch(logOut());
  }

  return (
    <Box>
      <Box
        display={'flex'}
        component={'img'}
        src={img}
        padding={'40px 53px'}
      ></Box>
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

      <Stack margin={'0 20px'} marginBottom={'20px'}>
        <Button
          variant="outlined"
          sx={{ color: '#000', border: '1px solid #000' }}
          onClick={handleClick}
        >
          Выйти из аккаунта
        </Button>
      </Stack>
    </Box>
  );
}
