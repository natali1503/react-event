import { useEffect, useState } from 'react';

interface IUsePagination {
  quantityHelpRequests: number;
  itemsPerPage: number
}

export function usePagination({ quantityHelpRequests, itemsPerPage }: IUsePagination) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(quantityHelpRequests / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setCurrentPage(1)
  }, [quantityHelpRequests, itemsPerPage]);

  return { 
    currentPage,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    setCurrentPage
  };
}