import type { MouseEventHandler } from 'react';

export type SwiperPagenationState = 'default' | 'active';

export interface SwiperPagenationProps {
  gameName: string;
  eventName: string;
  state?: SwiperPagenationState;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  'aria-label'?: string;
}

const base =
  'flex flex-col items-start gap-sm p-md w-[255px] overflow-clip font-sans text-text-inverse';

const stateClass: Record<SwiperPagenationState, string> = {
  default: 'bg-background-pagenation',
  active: 'bg-background-active',
};

export function SwiperPagenation({
  gameName,
  eventName,
  state = 'default',
  onClick,
  className,
  'aria-label': ariaLabel,
}: SwiperPagenationProps) {
  const interactiveClass = onClick ? 'cursor-pointer text-left' : '';
  const classes = [base, stateClass[state], interactiveClass, className].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="text-13 leading-16 font-700">{gameName}</span>
      <span className="w-full text-18 leading-20 font-700 truncate">{eventName}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-state={state}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-state={state} aria-label={ariaLabel} className={classes}>
      {content}
    </div>
  );
}
