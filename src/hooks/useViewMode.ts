import { useCallback, useState } from 'react';

import { VIEW_TOGGLE_OPTIONS } from '../const/const';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<VIEW_TOGGLE_OPTIONS>(VIEW_TOGGLE_OPTIONS.Grid);

  const handleViewChange = useCallback((newViewMode: VIEW_TOGGLE_OPTIONS) => {
    setViewMode(newViewMode);
  }, []);

  return { viewMode, handleViewChange };
}
