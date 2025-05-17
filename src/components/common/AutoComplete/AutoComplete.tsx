import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/className';

import { Input, InputProps } from '@/components/common/Input';

export type AutoCompleteSelectOption =
  | string
  | { label: string; value: string };

export interface AutoCompleteProps<T extends AutoCompleteSelectOption>
  extends Omit<InputProps, 'onChange' | 'onSelect'> {
  options: T[];
  onSelect: (option: T) => void;
  maxHeight?: number;
  selectedValue?: T | null;
}

export function AutoComplete<T extends AutoCompleteSelectOption>({
  options,
  onSelect,
  maxHeight = 300,
  selectedValue,
  ...props
}: AutoCompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 필터링된 옵션 목록
  const filteredOptions = inputValue.trim()
    ? options.filter((option) =>
        typeof option === 'string'
          ? option.toLowerCase().includes(inputValue.trim().toLowerCase())
          : option.label.toLowerCase().includes(inputValue.trim().toLowerCase())
      )
    : options;

  // 컴포넌트 마운트 시 input에 자동 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!open && inputValue.trim() === '' && value.trim() !== '') {
      setOpen(true);
    }
  };

  const handleSelect = (e: React.MouseEvent, value: T) => {
    e.preventDefault();
    e.stopPropagation();
    setInputValue(typeof value === 'string' ? value : value.label);
    onSelect(value);

    setOpen(false);
    inputRef.current?.focus();
  };

  // 포커스가 벗어났을 때 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);

        if (selectedValue) {
          setInputValue(
            typeof selectedValue === 'string'
              ? selectedValue
              : selectedValue.label
          );
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedValue]);

  // 검색어에 따라 텍스트를 강조 표시하는 함수
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) {
      return <span>{text}</span>;
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase().trim();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) {
      return <span className='text-neutral-300'>{text}</span>;
    }

    return (
      <span className='text-neutral-300'>
        {text.substring(0, index)}
        <span className='text-neutral-900 font-semibold'>
          {text.substring(index, index + lowerQuery.length)}
        </span>
        {text.substring(index + lowerQuery.length)}
      </span>
    );
  };

  return (
    <div ref={containerRef} className='relative w-full'>
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onMouseDown={() => {
          // 입력값이 있을 때만 드롭다운 열기
          if (inputValue.trim() !== '') {
            setOpen(true);
          }
        }}
        {...props}
      />

      {open && inputValue.trim() !== '' && (
        <div
          className={cn(
            'absolute left-0 right-0 mt-1 bg-white border border-neutral-50 rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.04)] z-50 overflow-y-auto',
            'max-h-[300px]'
          )}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {filteredOptions.length > 0 ? (
            <ul className='py-2'>
              {filteredOptions.map((option) => (
                <li
                  key={typeof option === 'string' ? option : option.label}
                  className='flex items-center px-3 py-3 text-body-1 font-semibold tracking-[0.57%] cursor-pointer hover:bg-neutral-900/[0.0375] rounded-xl mx-2'
                  onClick={(e) => handleSelect(e, option)}
                >
                  {highlightText(
                    typeof option === 'string' ? option : option.label,
                    inputValue
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className='py-2'>
              <li className='flex items-center px-3 py-3 text-body-1 font-semibold tracking-[0.57%] cursor-pointer hover:bg-neutral-900/[0.0375] rounded-xl mx-2'>
                <span className='text-neutral-300'>검색 결과가 없어요</span>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
