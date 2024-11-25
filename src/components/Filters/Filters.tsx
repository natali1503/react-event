import React, { useEffect, useState } from 'react';
// components
import StandardCheckboxes from './StandardCheckboxes';
import AccordionCheckboxes from './AccordionCheckboxes';
import Calendar from '../Calendar/Calendar';
// data
import { filterOptions } from '../../const/filterOptions';
// types
import { FilterProps } from '../../types/IFilterOption';
// styles
import { Box, Button, Paper, Typography } from '@mui/material';

const Filters: React.FC<FilterProps> = ({ selectedOptions, setSelectedOptions }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Toggle checkbox filter
  const handleToggle = (props: string): void => {
    setSelectedOptions((prev) => {
      if (prev.includes(props)) {
        return prev.filter((o) => o !== props);
      } else {
        return [...prev, props];
      }
    });
  };

  // Handle date change
  const handleDateChange = (date: string | null) => {
    if (date) {
      // Set selected options to only include the new date
      setSelectedOptions((prev) => {
        const filteredOptions = prev.filter(
          (option) => !option.match(/^\d{4}-\d{2}-\d{2}$/)
        );
        return [...filteredOptions, date]; // Keep only the formatted date
      });
    } else {
      setSelectedDate(null);
      setSelectedOptions((prev) =>
        prev.filter((option) => !option.match(/^\d{4}-\d{2}-\d{2}$/))
      );
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSelectedDate(null);
  };

  useEffect(() => {
    if (typeof selectedDate === 'string' || selectedDate === null) {
      handleDateChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <Paper
      sx={{
        backgroundColor: 'white',
        padding: '0.8rem 2.4rem',
        height: 'fit-content',
      }}
    >
      <Typography>
        <h3>Фильтрация</h3>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filterOptions.map((item, index) => {
          if (item.type === 'checkList') {
            // render standard options
            return (
              <StandardCheckboxes
                item={item}
                index={index}
                selectedOptions={selectedOptions}
                handleToggle={handleToggle}
              />
            );
          } else if (item.type === 'accordionList') {
            // Render options inside accordion
            return (
              <AccordionCheckboxes
                item={item}
                index={index}
                selectedOptions={selectedOptions}
                handleToggle={handleToggle}
              />
            );
          }
          return null;
        })}
      </Box>

      <Box sx={{ marginTop: '1rem' }}>
        <Typography
          variant="subtitle1"
          sx={{ opacity: '0.6' }}
        >
          Помощь актуальна до:
        </Typography>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        <Button
          disabled={selectedOptions.length === 0}
          onClick={() => handleReset()}
          variant="outlined"
          sx={{
            width: '100%',
            color: 'black',
            borderColor: 'black',
            padding: 1,
          }}
        >
          СБРОСИТЬ
        </Button>
      </Box>

      {/* todo: Delete h3 and replace with smth better */}
      <h3></h3>
    </Paper>
  );
};

export default Filters;
