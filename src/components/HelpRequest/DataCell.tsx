import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IDataCell {
  typeDirectionExternal?: 'row' | 'column';
  typeDirectionInternal?: 'row' | 'column';
  title?: string;
  data: { subtitle?: string; description?: string }[];
}

const DataCell: FC<IDataCell> = ({
  typeDirectionExternal,
  title,
  data,
  typeDirectionInternal = typeDirectionExternal,
}) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1rem'}>
      <Box>
        <Typography variant='h6'>{title}</Typography>
      </Box>

      <Box display={'flex'} flexDirection={typeDirectionExternal} gap={'1rem'} justifyContent={'space-between'}>
        {data.map((dataIteam, i) => (
          <Box key={i} display={'flex'} flexDirection={typeDirectionInternal} gap={'4px'}>
            {dataIteam.subtitle && <Typography fontWeight={500}>{dataIteam.subtitle}</Typography>}
            {dataIteam.description && <Typography>{dataIteam.description}</Typography>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DataCell;
