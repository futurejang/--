import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from 'react';

import { Icon } from '../Icon';

type InputBaseProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange' | 'onSubmit' | 'type' | 'children' | 'className'
>;

export interface SearchBarProps extends InputBaseProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  searchButtonLabel?: string;
}

const containerClass =
  'w-full rounded-xxs px-xxs flex items-center bg-transparent border-b border-border-secondary focus-within:border focus-within:border-border-focus';

const inputClass =
  'flex-1 min-w-0 bg-transparent outline-none border-0 font-sans text-12 font-400 leading-14 text-text-primary placeholder:text-text-grey';

const buttonClass =
  'inline-flex items-center justify-center p-sm bg-transparent border-0 cursor-pointer text-icon-grey shrink-0';

export function SearchBar({
  value: controlledValue,
  defaultValue = '',
  placeholder = '게임명 검색',
  onChange,
  onSubmit,
  className,
  searchButtonLabel = 'Search',
  ...rest
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(currentValue);
  };

  const classes = [containerClass, className].filter(Boolean).join(' ');

  return (
    <form role="search" onSubmit={handleSubmit} className={classes}>
      <input
        type="search"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClass}
        {...rest}
      />
      <button type="submit" aria-label={searchButtonLabel} className={buttonClass}>
        <Icon name="search" aria-label={searchButtonLabel} />
      </button>
    </form>
  );
}
