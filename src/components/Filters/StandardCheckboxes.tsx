// types
import { FC } from 'react';
import { IFilterOption } from '../../types/IFilterOption';
// styles
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

type StandardCheckboxesProps = {
  item: IFilterOption;
  index: number;
  selectedOptions: string[]; 
  handleToggle: (props: string) => void;
};

const StandardCheckboxes: FC<StandardCheckboxesProps> = ({ item, index, selectedOptions, handleToggle }) => {
  if (!item.options) {
    return null
  };

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
};

export default StandardCheckboxes;