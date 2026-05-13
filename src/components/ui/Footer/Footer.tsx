import { Fragment, type HTMLAttributes } from 'react';

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  primaryLinks?: ReadonlyArray<FooterLink>;
  secondaryLinks?: ReadonlyArray<FooterLink>;
  companyInfo?: ReadonlyArray<string>;
  copyright?: string;
}

const DEFAULT_PRIMARY_LINKS: ReadonlyArray<FooterLink> = [
  { label: '이용약관' },
  { label: '개인정보처리방침' },
  { label: '청소년보호정책' },
  { label: '게임IP사용가이드' },
  { label: '게임시간선택제' },
  { label: '고객센터' },
  { label: '전체서비스' },
];

const DEFAULT_SECONDARY_LINKS: ReadonlyArray<FooterLink> = [
  { label: '회사소개' },
  { label: '채용안내' },
  { label: '윤리경영' },
  { label: '넥슨브랜드가이드' },
  { label: '광고문의' },
  { label: '넥슨PC방' },
  { label: '넥슨에센셜' },
];

const DEFAULT_COMPANY_INFO: ReadonlyArray<string> = [
  '대표이사 이정헌 | 주소 경기도 성남시 분당구 판교로256번길 7 | 전화 1588-7701 | FAX 02-2052-7700',
  'E-mail webmaster@nexon.co.kr | 사업자등록번호 220-81-94939 | 통신판매업 신고번호 2013-경기성남-1075',
];

const DEFAULT_COPYRIGHT = '© NEXON Korea Corporation All Rights Reserved.';

const LINK_STYLE = {
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--font-size-12)',
  fontWeight: 'var(--font-weight-400)',
  lineHeight: 'var(--line-height-14)',
};

const COMPANY_INFO_STYLE = {
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--font-size-11)',
  fontWeight: 'var(--font-weight-400)',
  lineHeight: 'var(--line-height-16)',
  letterSpacing: '-0.3px',
};

const COPYRIGHT_STYLE = {
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--font-size-10)',
  fontWeight: 'var(--font-weight-400)',
  lineHeight: 'var(--line-height-16)',
  letterSpacing: '-0.3px',
};

const LINK_CLASS =
  'uppercase text-text-footer-link transition-colors hover:text-white-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2';

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.href) {
    return (
      <a href={link.href} className={LINK_CLASS} style={LINK_STYLE}>
        {link.label}
      </a>
    );
  }
  return (
    <span className={LINK_CLASS} style={LINK_STYLE}>
      {link.label}
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="bg-background-divider inline-block"
      style={{ width: 1, height: 12 }}
    />
  );
}

function LinkRow({ links }: { links: ReadonlyArray<FooterLink> }) {
  return (
    <nav className="flex flex-wrap items-center" style={{ gap: 'var(--spacing-sm)' }}>
      {links.map((link, i) => (
        <Fragment key={`${link.label}-${i}`}>
          <FooterLinkItem link={link} />
          {i < links.length - 1 && <Divider />}
        </Fragment>
      ))}
    </nav>
  );
}

export function Footer({
  primaryLinks = DEFAULT_PRIMARY_LINKS,
  secondaryLinks = DEFAULT_SECONDARY_LINKS,
  companyInfo = DEFAULT_COMPANY_INFO,
  copyright = DEFAULT_COPYRIGHT,
  className,
  style,
  ...rest
}: FooterProps) {
  return (
    <footer
      {...rest}
      className={['w-full bg-background-footer', className].filter(Boolean).join(' ')}
      style={{ padding: 'var(--spacing-2xl)', ...style }}
    >
      <div className="flex flex-col" style={{ gap: 'var(--spacing-md)' }}>
        <LinkRow links={primaryLinks} />
        <LinkRow links={secondaryLinks} />
        <div className="flex flex-col text-text-footer-caption" style={COMPANY_INFO_STYLE}>
          {companyInfo.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>
        <p className="text-text-footer-caption m-0" style={COPYRIGHT_STYLE}>
          {copyright}
        </p>
      </div>
    </footer>
  );
}
