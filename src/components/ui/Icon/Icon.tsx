import { useMemo } from 'react';

import cardSvgRaw from '../../../assets/icons/card.svg?raw';
import chevronLeftSvgRaw from '../../../assets/icons/chevronLeft.svg?raw';
import chevronRightSvgRaw from '../../../assets/icons/chevronRight.svg?raw';
import desktopSvgRaw from '../../../assets/icons/desktop.svg?raw';
import locationSvgRaw from '../../../assets/icons/location.svg?raw';
import menuSvgRaw from '../../../assets/icons/menu.svg?raw';
import mobileSvgRaw from '../../../assets/icons/mobile.svg?raw';
import newpageSvgRaw from '../../../assets/icons/newpage.svg?raw';
import searchSvgRaw from '../../../assets/icons/search.svg?raw';

export type IconName =
  | 'newpage'
  | 'menu'
  | 'chevronLeft'
  | 'chevronRight'
  | 'search'
  | 'location'
  | 'desktop'
  | 'mobile'
  | 'card';

// Figma export 시 chevronLeft.svg는 ›, chevronRight.svg는 ‹ 모양으로 나와
// 컴포넌트 이름(디자이너 의도)을 기준으로 교차 매핑한다.
const ICON_SOURCES: Record<IconName, string> = {
  newpage: newpageSvgRaw,
  menu: menuSvgRaw,
  chevronLeft: chevronRightSvgRaw,
  chevronRight: chevronLeftSvgRaw,
  search: searchSvgRaw,
  location: locationSvgRaw,
  desktop: desktopSvgRaw,
  mobile: mobileSvgRaw,
  card: cardSvgRaw,
};

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

function normalizeSvg(svgRaw: string, size: number): string {
  return svgRaw
    .replace(/fill="#[A-Fa-f0-9]{3,8}"/g, 'fill="currentColor"')
    .replace(/stroke="#[A-Fa-f0-9]{3,8}"/g, 'stroke="currentColor"')
    .replace(/\swidth="\d+(?:\.\d+)?"/, ` width="${size}"`)
    .replace(/\sheight="\d+(?:\.\d+)?"/, ` height="${size}"`);
}

export function Icon({ name, size = 24, className, 'aria-label': ariaLabel }: IconProps) {
  const html = useMemo(() => normalizeSvg(ICON_SOURCES[name], size), [name, size]);

  return (
    <span
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={['inline-flex text-icon-grey', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
