import { useRef } from 'react';

type useSwiperProps = {
  cooldownDuration: number;
  currentItem: number;
  maxItems: number;
  action: (arrow: 'previous' | 'next', step?: number) => void;
};

export function useSwiper({ cooldownDuration, currentItem, maxItems, action }: useSwiperProps) {
  const touchStartRef = useRef<number>(0);
  const touchStartTimeRef = useRef<number>(0); // Track the start time
  const isCooldown = useRef(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    touchStartRef.current = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    touchStartTimeRef.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (isCooldown.current) return;

    const touchEnd = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const swipeThreshold = 50; // Minimum distance for a valid swipe
    const fastSwipeThreshold = 300; // Max duration in ms to be considered a "fast swipe"

    const timeDiff = Date.now() - touchStartTimeRef.current; // Time difference in ms
    const swipeDistance = Math.abs(touchStartRef.current - touchEnd); // Distance traveled

    // Prevent swipe if it's too fast or the swipe distance is too small
    if (isCooldown.current || timeDiff < fastSwipeThreshold) return;

    isCooldown.current = true;

    // If the swipe distance is above threshold and within time limit, trigger action
    if (swipeDistance > swipeThreshold) {
      if (touchStartRef.current - touchEnd > swipeThreshold && currentItem !== maxItems) {
        action('next');
      } else if (touchEnd - touchStartRef.current > swipeThreshold && currentItem !== 1) {
        action('previous');
      }
    }

    setTimeout(() => {
      isCooldown.current = false;
    }, cooldownDuration);
  };

  return { handleTouchStart, handleTouchEnd };
}
