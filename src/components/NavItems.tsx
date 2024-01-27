'use client';
import { PRODUCT_CATEGORIES } from '@/app/config';
import { useState, useRef, useEffect, useCallback } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-outside-click';
const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>();
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => {
    setActiveIndex(null);
  });
  useEffect(() => {
    const listner = (event: KeyboardEvent) => {
      console.log('called');
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    document.addEventListener('keydown', listner);
    return () => {
      document.removeEventListener('keydown', listner);
    };
  }, []);
  const handleOpen = useCallback((index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  }, []);
  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => (
        <NavItem
          index={index}
          key={category.value}
          category={category}
          isAnyOpen={activeIndex !== null}
          isOpen={activeIndex === index}
          handleOpen={handleOpen}
        />
      ))}
    </div>
  );
};

export default NavItems;
