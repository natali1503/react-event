import { Stack } from '@mui/material';
import { Row } from './Row';
interface IItemBaseLocations {
  district: string;
  city: string;
}
export const ItemBaseLocations = ({ district, city }: IItemBaseLocations) => {
  return (
    <Stack gap={'4px'}>
      <Stack direction={'row'} gap={'4px'}>
        <Row header={'Область'} value={district} />
      </Stack>
      <Stack direction={'row'} gap={'4px'}>
        <Row header={'Населенный пункт'} value={city} />
      </Stack>
    </Stack>
  );
};
