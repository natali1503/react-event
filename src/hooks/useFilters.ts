import { useEffect, useState } from 'react';
import { applyFilter, applySearch } from '../utils/filterUtils';
import { HelpRequest } from '../types/HelpRequest';
import useParseURL from './useParseURL';

type useFilterProps = {
  helpRequestsList: HelpRequest[];
};

export function useFilters({ helpRequestsList }: useFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);

  useParseURL({
    searchTerm,
    selectedOptions,
    selectedDate,
    currentPage,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
    setCurrentPage,
  });

  const applyFilters = () => {
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

    setCurrentPage(currentPage);
    setFilteredData(requestedData);
  };

  useEffect(() => {
    applyFilters();
  }, [helpRequestsList, searchTerm, selectedOptions, selectedDate]);


  return {
    searchTerm,
    selectedOptions,
    selectedDate, 
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
    setCurrentPage,
  };
}