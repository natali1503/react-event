// types
import { FC } from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { IFilterOption } from '../../types/IFilterOption';
// styles

type StandardCheckboxesProps = {
  item: IFilterOption;
  index: number;
  selectedOptions: string[];
  handleToggle: (props: string) => void;
};

const StandardCheckboxes: FC<StandardCheckboxesProps> = ({ item, index, selectedOptions, handleToggle }) => {
  if (!item.options) {
    return null;
  }

  return (
    <Box key={index}>
      <Typography variant='subtitle1' sx={{ opacity: '0.6', fontSize: '1.6rem' }}>
        {item.title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.2rem' }}>
        {item.options.map(({ label, prop }) => (
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
        ))}
      </Box>
    </Box>
  );
};

export default StandardCheckboxes;
