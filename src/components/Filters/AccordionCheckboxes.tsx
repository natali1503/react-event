// styles
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { IFilterOption } from '../../types/IFilterOption';

type AccordionCheckboxesProps = {
  item: IFilterOption;
  index: number;
  selectedOptions: string[];
  handleToggle: (props: string) => void;
};

const AccordionCheckboxes: React.FC<AccordionCheckboxesProps> = ({ item, index, selectedOptions, handleToggle }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpandAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!item.accordion) {
    return null;
  }

  return (
    <Accordion
      key={index}
      expanded={expanded === item.accordion.accordionTitle}
      onChange={handleExpandAccordion(item.accordion.accordionTitle)}
      sx={{
        margin: 0,
        '&.Mui-expanded': {
          margin: 0,
        },
        '& .MuiAccordion-root': {},
      }}
    >
      <AccordionSummary
        aria-controls={`${item.accordion.accordionTitle}-content`}
        id={`${item.accordion.accordionTitle}-header`}
        sx={{
          '&.Mui-expanded': {
            minHeight: '4.8rem',
            height: '4.8rem',
          },
          height: '4.8rem',
        }}
      >
        <Typography sx={{ ml: '2rem', fontSize: '1.6rem' }}>{item.accordion.accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#F5F5F5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: '2rem' }}>
          {item.accordion.items.map((subItem) => (
            <Box key={subItem.title} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='subtitle1' sx={{ opacity: '0.6', fontSize: '1.6rem' }}>
                {subItem.title}
              </Typography>
              {subItem.options.map(({ label, prop }) => (
                <Box sx={{ ml: '1.2rem' }} key={prop}>
                  <FormControlLabel
                    key={prop}
                    control={<Checkbox checked={selectedOptions.includes(prop)} onChange={() => handleToggle(prop)} />}
                    label={label}
                    sx={{
                      width: 'fit-content',
                      hyphens: 'auto',
                      wordBreak: 'break-word',
                      userSelect: 'none',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '1.6rem',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionCheckboxes;
