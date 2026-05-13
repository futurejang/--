import logoUrl from '../../../assets/Logo.svg';

export interface LogoProps {
  alt?: string;
  width?: number;
  className?: string;
}

export function Logo({ alt = 'NEXON', width = 100, className }: LogoProps) {
  const height = (width * 24) / 100;
  return <img src={logoUrl} alt={alt} width={width} height={height} className={className} />;
}
