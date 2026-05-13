import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type FilterChipState = 'default' | 'active' | 'hover';

export interface FilterChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  selected?: boolean;
  state?: FilterChipState;
}

const STATE_CLASSES: Record<FilterChipState, string> = {
  default:
    'bg-transparent text-text-secondary hover:bg-background-white hover:text-background-active',
  active: 'bg-background-primary-btn text-text-inverse',
  hover: 'bg-background-white text-background-active',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center uppercase rounded-md cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2';

const BASE_STYLE = {
  paddingLeft: 'var(--spacing-xs)',
  paddingRight: 'var(--spacing-xs)',
  paddingTop: 'var(--spacing-xxs)',
  paddingBottom: 'var(--spacing-xxs)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--font-size-12)',
  fontWeight: 'var(--font-weight-400)',
  lineHeight: 'var(--line-height-14)',
};

export function FilterChip({
  children,
  selected = false,
  state,
  type = 'button',
  className,
  style,
  ...rest
}: FilterChipProps) {
  const resolvedState: FilterChipState = state ?? (selected ? 'active' : 'default');
  return (
    <button
      type={type}
      data-state={resolvedState}
      aria-pressed={selected}
      className={[BASE_CLASSES, STATE_CLASSES[resolvedState], className].filter(Boolean).join(' ')}
      style={{ ...BASE_STYLE, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
