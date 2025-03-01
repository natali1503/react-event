import { Tab } from '@mui/material';

import { useMode } from '../../../theme';

export function CustomTab({ label, index, ...props }) {
  const [theme] = useMode();
  return (
    <Tab
      label={label}
      {...a11yProps(index)}
      {...props}
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
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
