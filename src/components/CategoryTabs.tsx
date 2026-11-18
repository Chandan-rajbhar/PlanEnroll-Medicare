import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PlanCategory } from '../types';

interface TabItem {
  id: PlanCategory;
  label: string;
  badge?: string;
}

export const CategoryTabs: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { selectedCategory, setSelectedCategory, plans } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // 1. Mouse Wheel Scrolling: Convert vertical wheel delta into horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If user scrolls horizontally or vertically with mouse wheel
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        // Prevent default vertical page scroll when mouse is over tabs
        e.preventDefault();
        el.scrollLeft += delta * 1.1;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // 2. Mouse Drag-to-Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollStartLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const currentX = e.pageX - containerRef.current.offsetLeft;
    const walk = (currentX - startX) * 1.3;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    containerRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const getPlanCount = (cat: PlanCategory) => {
    if (cat === 'all') return plans.length;
    return plans.filter(p => p.category === cat).length;
  };

  const tabs: TabItem[] = [
    { id: 'all', label: 'All Plans', badge: `${getPlanCount('all')}` },
    { id: 'medicare-advantage', label: 'Medicare Advantage', badge: `${getPlanCount('medicare-advantage')}` },
    { id: 'medicare-supplement', label: 'Medicare Supplement', badge: `${getPlanCount('medicare-supplement')}` },
    { id: 'prescription-drug', label: 'Prescription Drug Plans', badge: `${getPlanCount('prescription-drug')}` },
    { id: 'special-needs', label: 'Special Needs Plans', badge: `${getPlanCount('special-needs')}` },
  ];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className={`overflow-x-auto no-scrollbar py-2.5 px-4 select-none touch-pan-x cursor-grab active:cursor-grabbing ${className}`}
    >
      <div className="flex items-center gap-2 min-w-max">
        {tabs.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                if (!hasMoved) {
                  setSelectedCategory(tab.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-sm cursor-pointer ${isSelected
                  ? 'bg-[#0F2544] text-white shadow-md ring-2 ring-blue-900/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
                }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-100 text-slate-600'
                    }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

