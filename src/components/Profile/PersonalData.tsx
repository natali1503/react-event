import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/types';
import { useSelector } from 'react-redux';
import { getDateStr } from '../../features/getDateStr';
import { Row } from './element/Row';
import { ItemEducation } from './element/ItemEducation';
import { ItemBaseLocations } from './element/ItemBaseLocations';

export default function PersonalData() {
  const { data } = useSelector((state: RootState) => {
    return state.profile;
  });

  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    const birthdate = getDateStr(data.birthdate);
    setBirthDate(birthdate);
  }, [data]);

  return (
    <Box display={'flex'} gap={'30px'} flexDirection={'column'}>
      <Stack alignItems={'flex-start'}>
        <Typography variant="h6" marginBottom={'10px'}>
          Профиль
        </Typography>
        <Stack direction={'row'} gap={'4px'}>
          <Row header={'Фамилия'} value={data.lastName} />
        </Stack>
        <Stack direction={'row'} gap={'4px'}>
          <Row header={'Имя'} value={data.name} />
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant="h6" marginBottom={'10px'}>
          Дата рождения
        </Typography>
        <Stack direction={'row'} gap={'4px'}>
          <Typography>{birthDate}</Typography>
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant="h6" marginBottom={'10px'}>
          Локация для помощи
        </Typography>
        <Stack gap={'16px'}>
          {data.baseLocations.map(({ city, district }, i) => {
            return (
              <ItemBaseLocations key={i} city={city} district={district} />
            );
          })}
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant="h6" marginBottom={'10px'}>
          Образование
        </Typography>
        <Stack gap={'16px'}>
          {data.educations.map(
            ({ organizationName, level, graduationYear }, i) => {
              return (
                <ItemEducation
                  key={i}
                  organizationName={organizationName}
                  level={level}
                  graduationYear={graduationYear}
                />
              );
            }
          )}
        </Stack>
      </Stack>

      <Stack alignItems={'flex-start'}>
        <Typography variant="h6" marginBottom={'10px'}>
          Обо мне
        </Typography>
        <Stack direction={'row'} gap={'4px'}>
          <Typography>{data.additionalInfo}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
