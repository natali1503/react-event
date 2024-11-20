import { useEffect, useState } from 'react';
import { HelpRequest } from '../types/HelpRequest';
import { applyFilter, applySearch } from '../utils/filterUtils';

type useFilterProps = {
  helpRequestList: HelpRequest[];
};

export function useFilters({ helpRequestList }: useFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);

  const filterHelpRequests = () => {
    const filterHelpRequests = () => {
      if (!helpRequestList || helpRequestList.length === 0) {
        setFilteredData([]);
        return;
      }

      let requestedData = helpRequestList;

      if (searchTerm) {
        requestedData = applySearch(requestedData, searchTerm);
      }

      if (selectedOptions.length > 0) {
        requestedData = applyFilter(requestedData, selectedOptions);
      }

      setCurrentPage(1);
      setFilteredData(requestedData);
    };
    filterHelpRequests();
  };

  useEffect(() => {
    filterHelpRequests();
  }, [helpRequestList, searchTerm, selectedOptions]);

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