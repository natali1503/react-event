import { FC, useCallback, useEffect, useRef, useState } from 'react';
// utils
import { debouncedFunction } from '../../utils/filterUtils';
// styles
import { InputAdornment, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
};

const SearchPanel: FC<SearchProps> = ({searchTerm, setSearchTerm}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearch = useRef<(value: string) => void | null>(null); // Ref to hold the debounced function

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    debouncedSearch.current?.(newValue);
  };

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, [setSearchTerm]);

  useEffect(() => {
    // todo: fix this warning - functional works as expected
    debouncedSearch.current = debouncedFunction(handleSearch, 250);
  }, [handleSearch]);

  return (
    <Paper sx={{ backgroundColor: 'white', padding: '0.5rem 32px' }}>
      <Typography>
        <h3>Найти запрос</h3>
      </Typography>
      <TextField
        label="Введите название задачи или организации"
        variant="standard"
        fullWidth
        sx={{ mb: 4 }}
        value={inputValue}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}

      />
    </Paper>
  );
};

export default SearchPanel;