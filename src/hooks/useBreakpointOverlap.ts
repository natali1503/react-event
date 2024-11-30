import { useState } from 'react';
import { useMode } from '../theme';

export function useBreakpointOverlap() {
  const [theme] = useMode();
  const [breakpointOverlap, setBreakpointOverlap] = useState<boolean>(window.innerWidth <= theme.breakpoints.values.sm);
  function checkScreenWidth() {
    if (window.innerWidth <= theme.breakpoints.values.sm) {
      setBreakpointOverlap(true);
    } else {
      setBreakpointOverlap(false);
    }
  }
  window.addEventListener('resize', checkScreenWidth);
  return { breakpointOverlap };
}
