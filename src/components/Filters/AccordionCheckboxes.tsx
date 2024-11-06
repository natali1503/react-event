// styles
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
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

  const handleExpandAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
  };

  if (!item.accordion) {
    return null;
  };
    
  return (
    <Accordion
      sx={{
        margin: 0,
        '&.Mui-expanded': {
          margin: 0, // Ensure no margin when expanded
        },
      }}
      key={index}
      expanded={expanded === item.accordion.accordionTitle}
      onChange={handleExpandAccordion(item.accordion.accordionTitle)}
    >
      <AccordionSummary
        aria-controls={`${item.accordion.accordionTitle}-content`}
        id={`${item.accordion.accordionTitle}-header`}
      >
        <Typography>{item.accordion.accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{backgroundColor: '#F5F5F5'}}>
        <Box
          sx={{display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: '1rem' }}
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
};

export default AccordionCheckboxes;