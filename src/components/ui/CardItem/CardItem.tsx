import { Badge } from '../Badge';
import { Icon } from '../Icon';

export type CardItemLayout = 'vertical' | 'horizontal';

export interface CardItemProps {
  /** 게임 썸네일 이미지 URL */
  imageSrc: string;
  /** 썸네일 alt 텍스트 */
  imageAlt?: string;
  /** 게임 이름 */
  gameName: string;
  /** 게임 카테고리 (uppercase로 표시) */
  gameCategory: string;
  /** Update 배지 표시 여부 */
  showUpdateBadge?: boolean;
  /** PC 지원 여부 (데스크톱 아이콘 표시) */
  supportsDesktop?: boolean;
  /** 모바일 지원 여부 (모바일 아이콘 표시) */
  supportsMobile?: boolean;
  /** 레이아웃 방향 */
  layout?: CardItemLayout;
  /** 클릭 핸들러 */
  onClick?: () => void;
  className?: string;
}

/**
 * 게임 카드 아이템 컴포넌트.
 * vertical(세로) / horizontal(가로) 두 가지 레이아웃과
 * hover 시 그림자 + 이미지 확대 효과를 지원한다.
 * Figma: Card item (9:597)
 */
export function CardItem({
  imageSrc,
  imageAlt,
  gameName,
  gameCategory,
  showUpdateBadge = true,
  supportsDesktop = true,
  supportsMobile = true,
  layout = 'vertical',
  onClick,
  className,
}: CardItemProps) {
  const isVertical = layout === 'vertical';

  const rootClass = [
    'group relative bg-background-white transition-shadow hover:shadow-sm overflow-hidden',
    isVertical ? 'flex flex-col w-[300px]' : 'flex flex-row w-[600px]',
    onClick ? 'cursor-pointer' : 'cursor-default',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const imageZoneClass = [
    'relative shrink-0 overflow-hidden',
    isVertical ? 'w-full h-[200px]' : 'w-[300px] h-[200px]',
  ].join(' ');

  const imageClass =
    'absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-300 ease-out group-hover:scale-110';

  const infoClass = [
    'flex flex-col items-start',
    isVertical ? 'w-full p-lg gap-lg' : 'w-[300px] p-lg gap-lg justify-center',
  ].join(' ');

  const body = (
    <>
      {/* 썸네일 */}
      <div className={imageZoneClass}>
        <img src={imageSrc} alt={imageAlt ?? gameName} className={imageClass} />
      </div>

      {/* 게임 정보 */}
      <div className={infoClass} style={{ padding: 'var(--spacing-lg)', gap: 'var(--spacing-lg)' }}>
        {/* 제목 + 카테고리 */}
        <div className="flex flex-col items-start" style={{ gap: 'var(--spacing-xs)' }}>
          <span
            className="text-text-primary font-sans font-weight-700 leading-20"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-16)',
              fontWeight: 'var(--font-weight-700)',
              lineHeight: 'var(--line-height-20)',
            }}
          >
            {gameName}
          </span>
          <span
            className="text-text-secondary font-sans uppercase"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-12)',
              fontWeight: 'var(--font-weight-400)',
              lineHeight: 'var(--line-height-14)',
            }}
          >
            {gameCategory}
          </span>
        </div>

        {/* 배지 + 지원 기기 */}
        <div className="flex items-center justify-between w-full">
          <div className="shrink-0">{showUpdateBadge && <Badge variant="update" />}</div>
          <div
            className="flex items-center justify-end flex-1"
            style={{ gap: 'var(--spacing-sm)' }}
          >
            {supportsDesktop && <Icon name="desktop" size={24} aria-label="PC 지원" />}
            {supportsMobile && <Icon name="mobile" size={24} aria-label="모바일 지원" />}
          </div>
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={rootClass}>
        {body}
      </button>
    );
  }

  return <article className={rootClass}>{body}</article>;
}
