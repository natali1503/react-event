import React from 'react';
// styles
import { Box, Grid2 } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Calendar = () => {
  const [cleared, setCleared] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        width: "100%",
        display: "flex",
        position: "relative",
        padding: "0",
        margin: "10px 0"
      }}>
        <Grid2 container spacing={2}>
          <DesktopDatePicker
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </Grid2>
      </Box>
    </LocalizationProvider>
  )
};

export default Calendar;