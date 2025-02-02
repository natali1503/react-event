import { useState } from 'react';

interface IUsePagination {
  quantityHelpRequests: number;
}

export function usePagination({ quantityHelpRequests }: IUsePagination) {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(quantityHelpRequests / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return { currentPage, totalPages, indexOfLastItem, indexOfFirstItem, setCurrentPage };
}
