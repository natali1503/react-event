import { useState, useEffect } from 'react';

export function useSlider() {
  const [offset, setOffset] = useState<number>(0); // Храним текущее смещение
  const [currentDiv, setCurrentDiv] = useState<number>(1); // Храним текущее смещение
  const [arrow, setArrow] = useState<string>(''); // Храним направление

  useEffect(() => {
    if (arrow === '') return;
    const div1 = document.getElementById('div1') as HTMLDivElement;
    const slider = document.getElementById('slider') as HTMLDivElement;
    const children = slider.childNodes;

    if (arrow === 'prev') {
      slider.style.transform = `translate(-${offset}px, 0px)`;
    } else {
      slider.style.transform = `translate(-${offset}px, 0px)`;
    }

    for (const child of children) {
      if (Number(child.id.at(-1)) === currentDiv) {
        child.style.opacity = '1';
      } else {
        child.style.opacity = '0.3';
      }
    }
    div1.style.opacity = '0.3';
  }, [currentDiv, offset, arrow]);
  useEffect(() => {
    const slider = document.getElementById('slider') as HTMLDivElement;
    const children = slider.childNodes;
    for (const child of children) {
      if (Number(child.id.at(-1)) === currentDiv) {
        child.style.opacity = '1';
      } else {
        child.style.opacity = '0.3';
      }
    }
  });
  return { offset, currentDiv, arrow, setOffset, setCurrentDiv, setArrow };
}
