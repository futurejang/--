export interface BannerProps {
  imageSrc: string;
  imageAlt: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

const INTERACTIVE_FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2';

export function Banner({
  imageSrc,
  imageAlt,
  href,
  onClick,
  className,
  'aria-label': ariaLabel,
}: BannerProps) {
  const interactive = Boolean(href ?? onClick);
  const wrapperClass = [
    'block w-full aspect-[24/7] overflow-hidden',
    interactive ? `cursor-pointer ${INTERACTIVE_FOCUS}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const image = <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={wrapperClass} aria-label={ariaLabel}>
        {image}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${wrapperClass} border-0 p-0 bg-transparent`}
        aria-label={ariaLabel}
      >
        {image}
      </button>
    );
  }
  return <div className={wrapperClass}>{image}</div>;
}
