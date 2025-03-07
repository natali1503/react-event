import { Box, Tabs } from '@mui/material';

import { CustomTab } from './CustomTab';
export function TabsProfile({ value, setValue }) {
  function handleChange(e: React.SyntheticEvent, numberTab: number) {
    setValue(numberTab);
  }

  return (
    <Box
      sx={{
        padding: '10px 0 0 0',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          minHeight: 0,
        }}
      >
        <CustomTab label={'Личные данные'} index={0} />
        <CustomTab label={'Контакты'} index={1} />
        <CustomTab label={'Избранное'} index={2} />
      </Tabs>
    </Box>
  );
}
