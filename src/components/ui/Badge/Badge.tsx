import type { ReactNode } from 'react';

export type BadgeVariant = 'recommend' | 'pick' | 'update';

export interface BadgeProps {
  variant: BadgeVariant;
  children?: ReactNode;
  className?: string;
}

const VARIANT_BG: Record<BadgeVariant, string> = {
  pick: 'bg-background-pick',
  recommend: 'bg-background-recommend',
  update: 'bg-background-update',
};

const DEFAULT_LABEL: Record<BadgeVariant, string> = {
  pick: 'Pick',
  recommend: '추천',
  update: 'Update',
};

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'rounded-full',
        'text-text-inverse',
        VARIANT_BG[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        minWidth: 'var(--spacing-2xl)',
        paddingLeft: 'var(--spacing-xs)',
        paddingRight: 'var(--spacing-xs)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-10)',
        fontWeight: 'var(--font-weight-400)',
        lineHeight: 'var(--line-height-16)',
        letterSpacing: '-0.3px',
      }}
    >
      {children ?? DEFAULT_LABEL[variant]}
    </span>
  );
}
