import React, { FC } from 'react';
// logic
import dayjs, { Dayjs } from 'dayjs';
// styles
import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type CalendarProps = {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
};

const Calendar: FC<CalendarProps> = ({selectedDate, setSelectedDate}) => {
  const [cleared, setCleared] = React.useState<boolean>(false);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD')
      if (formattedDate != 'Invalid Date') {
        setSelectedDate(formattedDate); // Format the date
      }
    } else {
      setSelectedDate(null); // Reset the selected date if cleared
    }
  };

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
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      <Box sx={{
        width: '100%',
        margin: '10px 0',
      }}>
        <DatePicker
          sx={{ width: '100%'}}
          value={selectedDate ? dayjs(selectedDate) : null} // Controlled date picker
          onChange={handleDateChange}
          yearsOrder="desc"
          format="DD - MM - YYYY"
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
