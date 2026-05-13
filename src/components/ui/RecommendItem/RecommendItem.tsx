import type { ReactNode } from 'react';

import { Badge, type BadgeVariant } from '../Badge';

export interface RecommendItemProps {
  imageSrc: string;
  gameName: string;
  imageAlt?: string;
  badgeVariant?: BadgeVariant;
  badgeLabel?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const cardBase =
  'group block w-[153px] h-[324px] bg-background-white text-left p-none border-0 cursor-default transition-shadow hover:shadow-sm';

const imageZone = 'relative w-full h-[192px] overflow-hidden shrink-0';
const imageEl =
  'absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110';

const infoZone = 'flex flex-col flex-1 min-h-0 items-start gap-xs px-sm py-md w-full';

const titleClass = 'font-sans text-14 font-700 leading-16 text-text-primary';

export function RecommendItem({
  imageSrc,
  gameName,
  imageAlt,
  badgeVariant = 'pick',
  badgeLabel,
  onClick,
  className,
}: RecommendItemProps) {
  const classes = [cardBase, onClick ? 'cursor-pointer' : '', className].filter(Boolean).join(' ');

  const body = (
    <>
      <div className={imageZone}>
        <img src={imageSrc} alt={imageAlt ?? gameName} className={imageEl} />
      </div>
      <div className={infoZone}>
        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        <span className={titleClass}>{gameName}</span>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {body}
      </button>
    );
  }

  return <article className={classes}>{body}</article>;
}
