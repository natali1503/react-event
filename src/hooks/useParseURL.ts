import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type useParseURLProps = {
  searchTerm: string,
  selectedOptions: string[],
  selectedDate: string | null,
  currentPage: number,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

const useParseURL = (props: useParseURLProps) => {
  const {
    searchTerm,
    selectedOptions,
    selectedDate,
    currentPage,
    setSearchTerm,
    setSelectedOptions,
    setSelectedDate,
    setCurrentPage,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (): { searchTerm: string; selectedOptions: string[]; selectedDate: string | null; currentPage: number } => {
    const params = new URLSearchParams(location.search);

    return {
      searchTerm: params.get('searchTerm') || '',
      selectedOptions: params.getAll('selectedOptions'),
      selectedDate: params.get('selectedDate') || null,
      currentPage: parseInt(params.get('currentPage') || '1', 10),
    };
  };

  useEffect(() => {
    const { searchTerm, selectedOptions, selectedDate, currentPage } = getQueryParams();

    setSearchTerm(searchTerm);
    setSelectedOptions(selectedOptions);
    setSelectedDate(selectedDate);
    setCurrentPage(currentPage);
  }, []);

  const updateFiltersInURL = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.set('searchTerm', searchTerm);
    selectedOptions.forEach(option => params.append('selectedOptions', option));
    if (selectedDate) params.set('selectedDate', selectedDate);
    params.set('currentPage', currentPage.toString());

    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(window.location.origin + window.location.pathname + '?' + params.toString());

    if (currentUrl.search !== newUrl.search) {
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  useEffect(() => {
    updateFiltersInURL();
  }, [searchTerm, selectedOptions, selectedDate, currentPage]);
};

export default useParseURL;