import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  ariaLabel?: string;
  iconOnly?: boolean;
}

/**
 * Shadcn UI Styled Select Component
 * Features:
 * - Floating dropdown popover with smooth fade-in
 * - Animated rotating chevron indicator
 * - Active checkmark indicator on selected item
 * - Keyboard navigation (Esc to close)
 * - Click-outside dismiss
 * - Full accessibility attributes
 */
export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  className = '',
  triggerClassName = '',
  contentClassName = '',
  disabled = false,
  prefixIcon,
  ariaLabel,
  iconOnly = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Shadcn Select Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || (selectedOption ? selectedOption.label : placeholder)}
        title={ariaLabel || (selectedOption ? `Sort: ${selectedOption.label}` : placeholder)}
        className={`flex items-center rounded-xl border border-slate-300 bg-white text-xs text-slate-800 shadow-2xs hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none ${
          iconOnly
            ? 'w-9 h-9 justify-center p-0'
            : 'w-full justify-between px-3.5 py-2.5'
        } ${
          isOpen ? 'ring-2 ring-blue-600/30 border-blue-600' : ''
        } ${triggerClassName}`}
      >
        {iconOnly ? (
          <span className="shrink-0 flex items-center justify-center text-slate-600">
            {prefixIcon || <ChevronDown className="w-4 h-4" />}
          </span>
        ) : (
          <>
            <div className="flex items-center gap-2 truncate pr-2">
              {prefixIcon && <span className="shrink-0 text-slate-500">{prefixIcon}</span>}
              {selectedOption ? (
                <span className="truncate font-semibold text-slate-900 flex items-center gap-1.5">
                  {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
                  <span>{selectedOption.label}</span>
                </span>
              ) : (
                <span className="text-slate-400 font-normal truncate">{placeholder}</span>
              )}
            </div>

            <ChevronDown
              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </>
        )}
      </button>

      {/* Shadcn Select Content / Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute left-0 top-full mt-1.5 w-full z-50 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-1 shadow-xl no-scrollbar animate-in fade-in zoom-in-95 duration-150 ${contentClassName}`}
          style={{ minWidth: '100%' }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={`relative flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer select-none ${
                  option.disabled
                    ? 'opacity-40 cursor-not-allowed text-slate-400'
                    : isSelected
                    ? 'bg-blue-50 font-bold text-blue-900'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  {option.icon && <span className="shrink-0">{option.icon}</span>}
                  <div>
                    <span className="block truncate">{option.label}</span>
                    {option.description && (
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

