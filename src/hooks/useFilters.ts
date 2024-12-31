import { useCallback, useEffect, useState } from 'react';
import { HelpRequest } from '../types/HelpRequest';
import { applyFilter, applySearch } from '../utils/filterUtils';

type useFilterProps = {
  helpRequestsList: HelpRequest[];
};

export function useFilters({ helpRequestsList }: useFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);

  const filterHelpRequests = useCallback(() => {
    if (!helpRequestsList || helpRequestsList.length === 0) {
      setFilteredData([]);
      return;
    }

    let requestedData = helpRequestsList;

    if (searchTerm) {
      requestedData = applySearch(requestedData, searchTerm);
    }

    if (selectedOptions.length > 0) {
      requestedData = applyFilter(requestedData, selectedOptions);
    }

    setFilteredData(requestedData);
  }, [helpRequestsList, searchTerm, selectedOptions]);

  useEffect(() => {
    filterHelpRequests();
  }, [filterHelpRequests]);

  return {
    searchTerm,
    selectedOptions,
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setCurrentPage,
  };
}
