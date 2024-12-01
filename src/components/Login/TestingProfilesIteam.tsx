import { Box, Card, CardContent, Typography } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { setPassword, setLogin } from '../../store/formAuthorization';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';

export function TestingProfilesIteam({ user }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Card
      variant="outlined"
      onClick={() => {
        dispatch(setLogin(user.login));
        dispatch(setPassword(user.password));
      }}
      sx={{
        borderColor: '#1976d2',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <InfoOutlined color="primary" sx={{ mr: 1 }} />
          <Box
            sx={{
              display: 'flex',
              marginBottom: '1',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>{user.name}</Typography>

            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Логин: {user.login}</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Пароль: {user.password}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
