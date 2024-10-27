// styles
import { Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

// Debounce function

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to be executed after input change
  const performLogic = (value: string) => {
    // Your logic here, e.g., updating a list, triggering a search, etc.
  };

  // Debounce a function that will execute after a delay
  const debouncedAction = debounce((value: string) => {
    // Actions that should happen after the debounce period
    // e.g., triggering a search or API call\
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    // Immediate logic
    performLogic(newValue);

    // Debounced action
    debouncedAction(newValue);
  };

  return (
    <Paper sx={{ backgroundColor: 'white', padding: '0.5rem 3rem' }}>
      <Typography>
        <h3>Найти запрос</h3>
      </Typography>
      <TextField
        label="Введите название задачи или организации"
        variant="standard"
        fullWidth
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Paper>
  );
};

export default Search;
