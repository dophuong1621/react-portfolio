import { useEffect, useRef } from 'react';

export default function useDraggableScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    // Trên mobile (touch) không cần drag — tránh tạo listeners thừa
    if (window.matchMedia('(hover: none)').matches) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    // Cache offsetLeft để tránh forced reflow mỗi lần mousemove
    let cachedOffsetLeft = 0;

    const beginHandle = (e) => {
      isDown = true;
      // Đọc offsetLeft 1 lần duy nhất khi bắt đầu drag
      cachedOffsetLeft = slider.getBoundingClientRect().left;
      slider.style.cursor = 'grabbing';
      slider.style.userSelect = 'none';
      startX = e.pageX - cachedOffsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopHandle = () => {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.removeProperty('user-select');
    };

    const moveHandle = (e) => {
      if (!isDown) return;
      e.preventDefault();
      // Dùng cachedOffsetLeft — không đọc offsetLeft mỗi frame
      const x = e.pageX - cachedOffsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };

    const disableDrag = (e) => e.preventDefault();

    slider.addEventListener('mousedown', beginHandle);
    slider.addEventListener('mouseleave', stopHandle);
    window.addEventListener('mouseup', stopHandle);
    slider.addEventListener('mousemove', moveHandle);
    slider.addEventListener('dragstart', disableDrag);

    return () => {
      slider.removeEventListener('mousedown', beginHandle);
      slider.removeEventListener('mouseleave', stopHandle);
      window.removeEventListener('mouseup', stopHandle);
      slider.removeEventListener('mousemove', moveHandle);
      slider.removeEventListener('dragstart', disableDrag);
    };
  }, []);

  return ref;
}
