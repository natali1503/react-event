import { Box, Pagination as MuiPagination } from '@mui/material';
import { FC } from 'react';

interface IPagination {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: FC<IPagination> = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px',
      }}
    >
      <MuiPagination count={totalPages} page={currentPage} size="large" onChange={handlePageChange} color="primary" />
    </Box>
  );
};

export default Pagination;
