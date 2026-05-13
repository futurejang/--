import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders <footer> landmark', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders default primary and secondary link labels', () => {
    render(<Footer />);
    expect(screen.getByText('이용약관')).toBeInTheDocument();
    expect(screen.getByText('전체서비스')).toBeInTheDocument();
    expect(screen.getByText('회사소개')).toBeInTheDocument();
    expect(screen.getByText('넥슨에센셜')).toBeInTheDocument();
  });

  it('renders default copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/NEXON Korea Corporation All Rights Reserved\./)).toBeInTheDocument();
  });

  it('renders default company info', () => {
    render(<Footer />);
    expect(screen.getByText(/대표이사 이정헌/)).toBeInTheDocument();
    expect(screen.getByText(/사업자등록번호/)).toBeInTheDocument();
  });

  it('renders link as <a> when href is provided, <span> otherwise', () => {
    render(
      <Footer
        primaryLinks={[{ label: '링크A', href: '/a' }, { label: '링크B' }]}
        secondaryLinks={[]}
      />,
    );
    const linkA = screen.getByText('링크A');
    const linkB = screen.getByText('링크B');
    expect(linkA.tagName).toBe('A');
    expect(linkA).toHaveAttribute('href', '/a');
    expect(linkB.tagName).toBe('SPAN');
  });

  it('overrides all label props', () => {
    render(
      <Footer
        primaryLinks={[{ label: 'P1' }]}
        secondaryLinks={[{ label: 'S1' }]}
        companyInfo={['INFO LINE 1']}
        copyright="© 2026 ACME"
      />,
    );
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('S1')).toBeInTheDocument();
    expect(screen.getByText('INFO LINE 1')).toBeInTheDocument();
    expect(screen.getByText('© 2026 ACME')).toBeInTheDocument();
    expect(screen.queryByText('이용약관')).not.toBeInTheDocument();
  });

  it('merges custom className while keeping defaults', () => {
    const { container } = render(<Footer className="custom-footer" />);
    const footer = container.querySelector('footer')!;
    expect(footer).toHaveClass('w-full');
    expect(footer).toHaveClass('bg-background-footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('applies uppercase utility on link items', () => {
    render(<Footer />);
    expect(screen.getByText('이용약관')).toHaveClass('uppercase');
  });
});
