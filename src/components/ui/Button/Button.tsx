import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'lg' | 'md' | 'sm';
export type ButtonState = 'default' | 'hover' | 'press';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
}

const base =
  'inline-flex items-center justify-center font-sans font-700 select-none cursor-pointer transition-colors';

const variantClass: Record<ButtonVariant, string> = {
  primary: [
    'bg-background-primary-btn text-text-inverse',
    'hover:bg-background-active active:bg-background-pressed',
    'data-[state=hover]:bg-background-active data-[state=press]:bg-background-pressed',
  ].join(' '),
  secondary: [
    'bg-background-secondary-btn text-text-inverse',
    'hover:bg-background-active active:bg-background-pressed',
    'data-[state=hover]:bg-background-active data-[state=press]:bg-background-pressed',
  ].join(' '),
  outline: [
    'bg-transparent text-text-primary border-2 border-border-primary rounded-xl',
    'hover:bg-background-active hover:text-text-inverse hover:border-transparent',
    'active:bg-background-pressed active:text-text-inverse active:border-transparent',
    'data-[state=hover]:bg-background-active data-[state=hover]:text-text-inverse data-[state=hover]:border-transparent',
    'data-[state=press]:bg-background-pressed data-[state=press]:text-text-inverse data-[state=press]:border-transparent',
  ].join(' '),
};

const sizeClass: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: {
    lg: 'px-2xl py-lg text-16 leading-20',
    md: 'px-xl py-md text-15 leading-18',
    sm: 'px-lg py-sm text-14 leading-16',
  },
  secondary: {
    lg: 'px-2xl py-lg text-16 leading-20',
    md: 'px-xl py-md text-15 leading-18',
    sm: 'px-lg py-sm text-14 leading-16',
  },
  outline: {
    lg: 'px-xl py-sm text-16 leading-20',
    md: 'px-lg py-xs text-15 leading-18',
    sm: 'px-sm py-xxs text-14 leading-16',
  },
};

export function Button({
  variant = 'primary',
  size = 'lg',
  state,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [base, variantClass[variant], sizeClass[variant][size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      data-variant={variant}
      data-size={size}
      data-state={state}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
