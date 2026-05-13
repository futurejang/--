export interface CardImageProps {
  /** 첫 번째(왼쪽) 썸네일 이미지 URL */
  image1Src: string;
  /** 두 번째(오른쪽) 썸네일 이미지 URL */
  image2Src: string;
  /** 첫 번째 이미지 alt 텍스트 */
  image1Alt?: string;
  /** 두 번째 이미지 alt 텍스트 */
  image2Alt?: string;
  className?: string;
}

/**
 * 두 개의 게임 썸네일을 나란히 보여주는 카드 이미지 컴포넌트.
 * Figma: recommend Meta Elements > card image (9:420)
 */
export function CardImage({
  image1Src,
  image2Src,
  image1Alt = '',
  image2Alt = '',
  className,
}: CardImageProps) {
  return (
    <div
      className={['flex items-start gap-xs w-full overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={{ gap: 'var(--spacing-xs)' }}
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: '300px', height: '200px' }}
      >
        <img
          src={image1Src}
          alt={image1Alt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: '300px', height: '200px' }}
      >
        <img
          src={image2Src}
          alt={image2Alt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  );
}
