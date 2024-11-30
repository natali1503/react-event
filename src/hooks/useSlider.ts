import { useState, useEffect } from 'react';

export function useSlider() {
  const [offset, setOffset] = useState<number>(0);
  const [currentDiv, setCurrentDiv] = useState<number>(1);
  const [arrow, setArrow] = useState<string>('');

  useEffect(() => {
    if (arrow === '') return;
    const slider = document.getElementById('slider') as HTMLDivElement;
    const children = slider.children;

    slider.style.transition = 'transform 1s ease-in-out';
    slider.style.transform = `translate(-${offset}px, 0px)`;

    for (const child of children) {
      const childElement = child as HTMLDivElement;
      childElement.style.transition = 'all 1s ease-in-out';
      const lastChar = child.id.length - 1;
      childElement.style.opacity = Number(child.id[lastChar]) === currentDiv ? '1' : '0.2';
      childElement.style.transform = Number(child.id[lastChar]) === currentDiv ? 'scale(1)' : 'scale(0.8)';
    }
  }, [currentDiv, offset]);

  useEffect(() => {
    const slider = document.getElementById('slider') as HTMLDivElement;
    const children = slider.children;
    for (const child of children) {
      const childElement = child as HTMLDivElement;
      const lastChar = child.id.length - 1;
      childElement.style.transition = 'all 1s ease-in-out';
      childElement.style.opacity = Number(child.id[lastChar]) === currentDiv ? '1' : '0.2';
      childElement.style.scale = Number(child.id[lastChar]) === currentDiv ? '1' : '0.8';
    }
  });
  function onHandleClickSlider(arrow: 'previous' | 'next', step: number = 1) {
    if (arrow === 'next') {
      setOffset((value: number) => value + step * 280);
      setCurrentDiv((curr) => curr + step * 1);
      setArrow(() => 'next');
    } else {
      setOffset((value) => value - step * 280);
      setCurrentDiv((curr) => curr - step * 1);
      setArrow(() => 'prev');
    }
  }
  return { offset, currentDiv, arrow, setOffset, setCurrentDiv, setArrow, onHandleClickSlider };
}
