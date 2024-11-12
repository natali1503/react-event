import { Box, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/api-actions';
import { AppDispatch, RootState } from '../../store/types';

import { Error } from '../../components/Error';
import CardProfile from '../../components/Profile/CardProfile';
import PersonalData from '../../components/Profile/PersonalData';
import PagesProfile from '../../components/Profile/PagesProfile';
import Contacts from '../../components/Profile/Contacts';
import Favorites from '../../components/Profile/Favorites';
import { useMode } from '../../theme';

export default function Profile() {
  const [numberTab, setNumberTab] = useState(0);
  const [theme] = useMode();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => {
    return state.profile;
  });

  useEffect(() => {
    if (profile.isData) return;
    dispatch(getUser());
  }, []);

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setNumberTab(numberTab);
  }

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      alignItems={'center'}
      width={'100%'}
    >
      <Box
        width={'100%'}
        display="flex"
        flexDirection={'column'}
        bgcolor={theme.palette.background.default}
      >
        <Stack alignItems={'flex-start'}>
          <Typography variant="h4" margin={'30px 40px'}>
            Мой профиль
          </Typography>
        </Stack>
        {profile.loading && <Skeleton width={'100px'} height={'100px'} />}
        {profile.error && <Error />}
        {profile.isData && (
          <Box display="flex" margin={'20px 40px'} gap={'20px'}>
            <Stack
              bgcolor={'white'}
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
              height={'100%'}
            >
              <CardProfile />
            </Stack>
            <Box
              bgcolor={'white'}
              padding={'36px'}
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
              minHeight={'100vh'}
              width={'100%'}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={numberTab} onChange={handleChange}>
                  <Tab label="Личные данные" {...a11yProps(0)} />
                  <Tab label="Контакты" {...a11yProps(1)} />
                  <Tab label="Избранное" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <PagesProfile value={numberTab} index={0}>
                <PersonalData />
              </PagesProfile>
              <PagesProfile value={numberTab} index={1}>
                <Contacts />
              </PagesProfile>
              <PagesProfile value={numberTab} index={2}>
                <Favorites />
              </PagesProfile>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
