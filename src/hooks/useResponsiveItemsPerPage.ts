import { useState, useEffect } from 'react';

const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setItemsPerPage(1);
      } else if (width >= 600 && width < 836) {
        setItemsPerPage(1);
      } else if (width >= 836 && width < 960) {
        setItemsPerPage(2);
      } else if (width >= 960 && width < 1280) {
        setItemsPerPage(1);
      } else if (width >= 1280 && width < 1560) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  return itemsPerPage;
};

export default useResponsiveItemsPerPage;