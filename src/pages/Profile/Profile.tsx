import { Box, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/profileStore';
import { AppDispatch, RootState } from '../../store/types';
import CardProfile from '../../components/profile/CardProfile';
import PagesProfile from '../../components/profile/PagesProfile';
import PersonalData from '../../components/profile/PersonalData';
import Favorites from '../../components/profile/Favorites';
import Contacts from '../../components/profile/Contacts';

export default function Profile() {
  const [numberTab, setNumberTab] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => {
    return state.profile;
  });
  const isAuth = useSelector((state: RootState) => {
    return state.auth.isAuthenticated;
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setNumberTab(numberTab);
  }

  return (
    isAuth && (
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
          bgcolor={'#f5f6f5'}
          // margin={'0 210px'}
        >
          <Stack alignItems={'flex-start'}>
            <Typography variant="h4" margin={'30px 40px'}>
              Мой профиль
            </Typography>
          </Stack>
          {!profile.isData ? (
            <Skeleton />
          ) : (
            <Box display="flex" margin={'20px 40px'} gap={'20px'}>
              <Stack
                bgcolor={'white'}
                borderRadius={'4px'}
                border={'1px solid #e0e0e0'}
                height={'100%'}
              >
                <CardProfile />
              </Stack>
              <Box
                bgcolor={'white'}
                padding={'36px'}
                borderRadius={'4px'}
                border={'1px solid #e0e0e0'}
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
    )
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
