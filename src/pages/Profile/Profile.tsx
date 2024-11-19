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
        height={'100%'}
        width={'100%'}
        display="flex"
        flexDirection={'column'}
        bgcolor={theme.palette.background.default}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.lg}px)`]: {
            margin: '0 7rem',
          },
        }}
      >
        <Stack alignItems={'flex-start'}>
          <Typography
            variant="h4"
            margin={
              'calc(3rem - 0.015*(100vw - 192rem)) calc(4rem - 0.02*(100vw - 192rem)) 0px calc(4rem - 0.02*(100vw - 192rem))'
            }
            sx={{
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                marginTop: '2rem',
              },
            }}
          >
            Мой профиль
          </Typography>
        </Stack>
        {profile.loading && (
          <Box height={'100%'}>
            <Skeleton width={'100px'} height={'100px'} />
          </Box>
        )}
        {profile.error && <Error />}
        {profile.isData && (
          <Box
            display="flex"
            margin={
              'calc(2rem - 0.01*(100vw - 192rem)) calc(4rem - 0.02*(100vw - 192rem))'
            }
            flexDirection={'row'}
            gap={'2rem'}
            sx={{
              [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                flexDirection: 'column',
                margin: '2rem 4rem',
              },
            }}
          >
            <Stack
              bgcolor={'white'}
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
            >
              <CardProfile />
            </Stack>
            <Box
              bgcolor={'white'}
              padding={
                '0 calc(3.6rem - 0.018*(100vw - 192rem)) calc(4rem - 0.02*(100vw - 192rem)) calc(3.6rem - 0.018*(100vw - 192rem))'
              }
              borderRadius={'4px'}
              border={`1px solid ${theme.palette.grey[300]}`}
              maxHeight={'100vh'}
              width={'100%'}
            >
              <Box
                sx={{
                  padding: '10px 0 0 0',
                }}
              >
                <Tabs
                  value={numberTab}
                  onChange={handleChange}
                  sx={{
                    minHeight: 0,
                  }}
                >
                  <Tab
                    label="Личные данные"
                    {...a11yProps(0)}
                    sx={{
                      paddingTop: '0px',
                      minHeight: 0,
                      borderBottom: 1,
                      borderColor: 'divider',
                      fontSize: '1.4rem',
                      [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                        fontSize: '1.2rem',
                      },
                    }}
                  />
                  <Tab
                    label="Контакты"
                    {...a11yProps(1)}
                    sx={{
                      paddingTop: '0px',
                      minHeight: 0,
                      borderBottom: 1,
                      borderColor: 'divider',
                      fontSize: '1.4rem',
                      [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                        fontSize: '1.2rem',
                      },
                    }}
                  />
                  <Tab
                    label="Избранное"
                    {...a11yProps(2)}
                    sx={{
                      paddingTop: '0px',
                      minHeight: 0,
                      borderBottom: 1,
                      borderColor: 'divider',
                      fontSize: '1.4rem',
                      [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
                        fontSize: '1.2rem',
                      },
                    }}
                  />
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
