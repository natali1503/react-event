import { Stack } from '@mui/material';

import { Row } from './Row';

interface IItemEducation {
  organizationName: string;
  level: string;
  graduationYear: number;
}
export const ItemEducation = ({ organizationName, level, graduationYear }: IItemEducation) => {
  return (
    <Stack gap={'4px'}>
      <Stack direction={'row'} gap={'4px'}>
        <Row header={'Учреждение'} value={organizationName} />
      </Stack>
      <Stack direction={'row'} gap={'4px'}>
        <Row header={'Уровень образования'} value={level} />
      </Stack>
      <Stack direction={'row'} gap={'4px'}>
        <Row header={'Год окончания'} value={String(graduationYear)} />
      </Stack>
    </Stack>
  );
};
