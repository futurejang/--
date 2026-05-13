import type { HTMLAttributes } from 'react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Logo } from '../Logo';

export interface GnbBarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  menuLabel?: string;
  signupLabel?: string;
  loginLabel?: string;
  logoAlt?: string;
  onMenuClick?: () => void;
  onCardClick?: () => void;
  onLocationClick?: () => void;
  onSignupClick?: () => void;
  onLoginClick?: () => void;
}

const iconButtonClass =
  'inline-flex items-center justify-center text-icon-grey cursor-pointer bg-transparent border-0 p-none';

export function GnbBar({
  menuLabel = '메뉴',
  signupLabel = '회원가입',
  loginLabel = '로그인',
  logoAlt = 'NEXON',
  onMenuClick,
  onCardClick,
  onLocationClick,
  onSignupClick,
  onLoginClick,
  className,
  ...rest
}: GnbBarProps) {
  const classes = ['w-full bg-background-white flex items-center justify-center p-md', className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} aria-label="Global navigation" {...rest}>
      <div className="flex flex-1 min-w-0 items-center gap-sm">
        <button
          type="button"
          onClick={onMenuClick}
          className={`${iconButtonClass} gap-sm font-sans text-16 font-700 leading-20 text-text-primary`}
          aria-label={menuLabel}
        >
          <Icon name="menu" aria-label={menuLabel} />
          <span>{menuLabel}</span>
        </button>
      </div>

      <Logo alt={logoAlt} width={100} className="shrink-0" />

      <div className="flex flex-1 min-w-0 items-center justify-end gap-sm">
        <button type="button" onClick={onCardClick} className={iconButtonClass} aria-label="card">
          <Icon name="card" aria-label="card" />
        </button>
        <button
          type="button"
          onClick={onLocationClick}
          className={iconButtonClass}
          aria-label="location"
        >
          <Icon name="location" aria-label="location" />
        </button>
        <button
          type="button"
          onClick={onSignupClick}
          className={`${iconButtonClass} font-sans text-14 font-700 leading-16 text-text-primary`}
        >
          {signupLabel}
        </button>
        <Button variant="outline" size="md" onClick={onLoginClick}>
          {loginLabel}
        </Button>
      </div>
    </nav>
  );
}
