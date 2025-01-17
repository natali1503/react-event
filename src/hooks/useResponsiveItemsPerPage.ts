import { useState, useEffect } from 'react';

const useResponsiveItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;


      if (width < 856) {
        setItemsPerPage(1);
      } else if (width >= 856 && width < 961) {
        setItemsPerPage(2);
      } else if (width >= 961 && width < 1218) {
        setItemsPerPage(1);
      } else if (width >= 1218 && width < 1582) {
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