import React from 'react';
import { TestingProfilesIteam } from './TestingProfilesIteam';
import { testUsers } from '../../const/const';
import { Box, Button, Typography } from '@mui/material';
import { useMode } from '../../theme';
import { useSlider } from '../../hooks/useSlider';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

export default function TestingProfilesSM() {
  const [theme] = useMode();

  const { currentDiv, setOffset, setCurrentDiv, setArrow } = useSlider();

  return (
    <Box
      display={'flex'}
      width={'100%'}
      sx={{
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          justifyContent: 'center',
          height: '100%',
        },
      }}
    >
      <Box
        marginLeft={'4rem'}
        marginTop={'64px'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            marginLeft: '2rem',
          },
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            marginTop: '0rem',
            marginLeft: '0rem',
            borderLeft: `1px solid ${theme.palette.grey[300]}`,
            borderRight: `1px solid ${theme.palette.grey[300]}`,
            padding: '3rem',
            paddingLeft: '5rem',
            paddingRight: '5rem',
          },
        }}
      >
        <Typography variant="h4">Тестовые профили</Typography>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          sx={{
            marginTop: '9rem',
            [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
              marginTop: '3rem',
            },
          }}
        >
          <Box sx={{ zIndex: 1, maxWidth: '25px', margin: '0 5px' }}>
            <Button
              style={{
                padding: 0,
                minWidth: 0,
                width: '30px',
              }}
              disabled={currentDiv === 1}
              onClick={() => {
                setOffset((value) => value - 280);
                setCurrentDiv((curr) => curr - 1);
                setArrow(() => 'prev');
              }}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </Button>
          </Box>
          <Box sx={{ width: '250px', height: '106px' }}>
            <div style={{ position: 'relative' }}>
              <div id="slider" style={{ display: 'flex', gap: '30px', left: '0px', top: '0px', position: 'absolute' }}>
                {testUsers.map((user, index) => (
                  <Box sx={{ width: '250px' }} key={index} id={`div${index + 1}`}>
                    <TestingProfilesIteam user={user} />
                  </Box>
                ))}
              </div>
            </div>
          </Box>
          <Box sx={{ zIndex: 1 }}>
            <Button
              style={{
                padding: 0,
                minWidth: 0,
                width: '30px',
              }}
              disabled={currentDiv === testUsers.length}
              onClick={() => {
                setOffset((value: number) => value + 280);
                setCurrentDiv((curr) => curr + 1);
                setArrow(() => 'next');
              }}
            >
              <KeyboardArrowRightOutlinedIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
