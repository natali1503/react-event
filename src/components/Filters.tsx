import React, { useEffect, useState } from 'react';
// components
import Calendar from './Calendar';
// styles
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material';

interface AccordionOption {
  title: string; // Title for each accordion item
  options: {
    label: string; // Display label for the option
    prop: string; // Corresponding property for filtering
  }[];
}

type FilterProps = {
  selectedOptions: string[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
};

interface FilterOption {
  title?: string; // Optional title for the filter section
  options?: {
    label: string; // Display label for the option
    prop: string; // Corresponding property for filtering
  }[]; // Standard options
  accordion?: {
    accordionTitle: string; // Title for the accordion
    items: AccordionOption[]; // Array of options to include in the accordion
  };
}

const filterData: FilterOption[] = [
  { title: 'Кому мы помогаем', options: [
    { label: 'Пенсионеры', prop: 'person' },
    { label: 'Дома престарелых', prop: 'organization' },
  ]},
  { title: 'Чем мы помогаем', options: [
    { label: 'Вещи', prop: 'material' },
    { label: 'Финансирование', prop: 'finance' },
  ]},

  {
    accordion: {
      accordionTitle: 'Волонтерство',
      items: [
        { title: 'Специализация', options: [
          { label: 'Квалифицированная', prop: 'professional' },
          { label: 'Не требует профессии', prop: 'common' },
        ]},
        { title: 'Формат', options: [
          { label: 'Онлайн', prop: 'true' },
          { label: 'Офлайн', prop: 'false' },
        ]},
        { title: 'Необходимо волонтеров', options: [
          { label: 'Группа', prop: 'group' },
          { label: 'Один', prop: 'single' },
        ]},
      ],
    },
  },
];

const Filters = ({selectedOptions, setSelectedOptions}: FilterProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleToggle = (props: string): void => {
    setSelectedOptions((prev) =>
      prev.includes(props)
        ? prev.filter((o) => o !== props)
        : [...prev, props]
    );
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleReset = () => {
    setSelectedOptions([]);
  };

  const handleApplyFilters = () => {
    console.log('Selected Options:', selectedOptions);
    
  };

  useEffect(() => {
    handleApplyFilters();
  }, [selectedOptions]);

  return (
    <Paper sx={{ backgroundColor: 'white', padding: '0.5rem 1.5rem' }}>
      <Typography>
        <h3>Фильтрация</h3>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filterData.map((item, index) => {
          if (item.options) {
            // render standard options with title
            return (
              <Box key={index}>
                <Typography variant="subtitle1" sx={{ opacity: '0.6' }}>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {item.options.map(({label, prop}) => (
                    <FormControlLabel
                      key={prop}
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(prop)}
                          onChange={() => handleToggle(prop)}
                        />
                      }
                      label={label}
                      sx={{ userSelect: 'none' }}
                    />
                  ))}
                </Box>
              </Box>
            );
          } else if (item.accordion) {
            // Render accordion
            return (
              <Accordion
                sx={{
                  paddingLeft: '1rem',
                  margin: 0,
                  '&.Mui-expanded': {
                    margin: 0, // Ensure no margin when expanded
                  },
                }}
                key={index}
                expanded={expanded === item.accordion.accordionTitle}
                onChange={handleChange(item.accordion.accordionTitle)}
              >
                <AccordionSummary
                  aria-controls={`${item.accordion.accordionTitle}-content`}
                  id={`${item.accordion.accordionTitle}-header`}
                >
                  <Typography>{item.accordion.accordionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {item.accordion.items.map((subItem) => (
                      <Box
                        key={subItem.title}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <Typography variant="subtitle1" sx={{ opacity: '0.6' }}>
                          {subItem.title}
                        </Typography>
                        {subItem.options.map(({label, prop}) => (
                          <FormControlLabel
                            key={prop}
                            control={
                              <Checkbox
                                checked={selectedOptions.includes(prop)}
                                onChange={() => handleToggle(prop)}
                              />
                            }
                            label={label}
                            sx={{ userSelect: 'none' }}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }
          return null;
        })}
      </Box>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ opacity: '0.6', marginTop: '1rem' }}
        >
          Помощь актуальна до:
        </Typography>
        <Calendar />
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

      {/* for the same margin as on top */}
      <h3></h3>
    </Paper>
  );
};

export default Filters;
