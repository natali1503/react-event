import { FC, useCallback, useEffect, useRef, useState } from 'react';
// utils
import { debouncedFunction } from '../../utils/filterUtils';
// styles
import { Box, InputBase, Paper, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
};

const SearchPanel: FC<SearchProps> = ({searchTerm, setSearchTerm}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, [setSearchTerm]);

  const debouncedSearch = useRef<(value: string) => void>(debouncedFunction(handleSearch, 250));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch.current?.(newValue);
  };

  useEffect(() => {
    // todo: fix the warning - functionality works as expected
    debouncedSearch.current = debouncedFunction(handleSearch, 250);
  }, [handleSearch]);

  return (
    <Paper sx={{
      width: '100%'
    }}>
      <Stack 
        sx={{ 
          backgroundColor: 'white', 
          gap: '2rem', 
          '@media (max-width: 1560px)': {
            padding: '1.6rem', 
            mb: '0' 
          },
          '@media (min-width: 1561px)': {
            padding: '2rem', 
            mb: '1.6rem'
          },
        }}
      >
        <Typography 
          variant='h6' 
          width='fit-content'
          sx={{
            width: 'fit-content',
            display: 'block',
              '@media (max-width: 1560px)': {
                display: 'none',
              },
              '@media (min-width: 1561px)': {
                display: 'block',
              },
          }}
        >
          Найти запрос
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid gray' }}>
          <SearchIcon sx={{ position: 'absolute', color: 'gray'}} />
          <InputBase
            placeholder="Введите название задачи или организации"
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              width: '100%',
              fontSize: '1.6rem',
              paddingLeft: '2.5rem'
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default SearchPanel;