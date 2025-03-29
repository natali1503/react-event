import { useRef } from 'react';

type useSwiperProps = {
  cooldownDuration: number;
  currentItem: number;
  maxItems: number;
  action: (arrow: 'previous' | 'next', step?: number) => void;
};

export function useSwiper({ cooldownDuration, currentItem, maxItems, action }: useSwiperProps) {
  const touchStartRef = useRef<number>(0);
  const touchStartTimeRef = useRef<number>(0);
  const isCooldown = useRef(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    touchStartRef.current = 'touches' in e ? e.touches[0].clientX : (e as unknown as MouseEvent).clientX;
    touchStartTimeRef.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (isCooldown.current) return;

    const touchEnd = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as unknown as MouseEvent).clientX;
    const swipeThreshold = 150;
    const fastSwipeThreshold = 3000;
    const minSwiperDuration = 300;

    const timeDiff = Date.now() - touchStartTimeRef.current;
    const swipeDistance = Math.abs(touchStartRef.current - touchEnd);

    if (timeDiff < fastSwipeThreshold) return;

    if (isCooldown.current || timeDiff < minSwiperDuration || swipeDistance < swipeThreshold) return;

    isCooldown.current = true;

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
