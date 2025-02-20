import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type useParseURLProps = {
  searchTerm?: string,
  selectedOptions?: string[],
  selectedDate?: string | null,
  currentPage?: number,
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>,
  setSelectedOptions?: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedDate?: React.Dispatch<React.SetStateAction<string | null>>,
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>,
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

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);

    const urlSearchTerm = params.get('searchTerm') || ''
    const urlSelectedOptions = params.getAll('selectedOptions')
    const urlSelectedDate = params.get('selectedDate') || null
    const urlCurrentPage = parseInt(params.get('currentPage') || '1', 10)

    if (urlSearchTerm && urlSearchTerm !== searchTerm && setSearchTerm) {
      setSearchTerm(urlSearchTerm);
    } 
    if (urlSelectedOptions && urlSelectedOptions !== selectedOptions && setSelectedOptions) {
      setSelectedOptions(urlSelectedOptions);
    }
    if (urlSelectedDate && urlSelectedDate !== selectedDate && setSelectedDate) {
      setSelectedDate(urlSelectedDate);
    }
    if (urlCurrentPage && urlCurrentPage !== currentPage && setCurrentPage) {
      setCurrentPage(urlCurrentPage);
    }
  };

  const updateFiltersInURL = () => {
    const params = new URLSearchParams(window.location.search);
  
    if (searchTerm) params.set('searchTerm', searchTerm);
    else if (searchTerm === '') params.delete('searchTerm');
    if (selectedOptions) {
      params.delete('selectedOptions');
      selectedOptions.forEach(option => params.append('selectedOptions', option));
    }
    if (selectedDate) params.set('selectedDate', selectedDate);
    if (currentPage) params.set('currentPage', currentPage.toString());
  
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(window.location.origin + window.location.pathname + '?' + params.toString());
  
    if (currentUrl.search !== newUrl.search) {
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  useEffect(() => {
    getQueryParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateFiltersInURL();
  }, [searchTerm, selectedOptions, selectedDate, currentPage]);
};

export default useParseURL;