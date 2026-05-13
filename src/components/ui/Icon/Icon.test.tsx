import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders an svg inside the wrapper', () => {
    const { container } = render(<Icon name="search" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies default size 24 to width and height', () => {
    const { container } = render(<Icon name="menu" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
  });

  it('applies custom size to width and height', () => {
    const { container } = render(<Icon name="menu" size={32} />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
  });

  it('replaces hardcoded fill colors with currentColor', () => {
    const { container } = render(<Icon name="menu" />);
    const html = container.innerHTML;
    expect(html).toContain('fill="currentColor"');
    expect(html).not.toContain('#333333');
  });

  it('chevronLeft renders a left-pointing path (raster swap corrected)', () => {
    const { container } = render(<Icon name="chevronLeft" />);
    expect(container.innerHTML).toContain('M16 22L6 12L16 2');
  });

  it('chevronRight renders a right-pointing path (raster swap corrected)', () => {
    const { container } = render(<Icon name="chevronRight" />);
    expect(container.innerHTML).toContain('M8.025 22L6.25 20.225L14.475 12');
  });

  it('is decorative by default (aria-hidden, no role)', () => {
    const { container } = render(<Icon name="menu" />);
    const span = container.querySelector('span')!;
    expect(span.getAttribute('aria-hidden')).toBe('true');
    expect(span.getAttribute('role')).toBeNull();
  });

  it('becomes role="img" with the provided aria-label', () => {
    render(<Icon name="search" aria-label="검색" />);
    const icon = screen.getByRole('img', { name: '검색' });
    expect(icon).toBeInTheDocument();
  });

  it('keeps default text-icon-grey class and merges custom className', () => {
    const { container } = render(<Icon name="menu" className="custom-class" />);
    const span = container.querySelector('span')!;
    expect(span.className).toContain('text-icon-grey');
    expect(span.className).toContain('custom-class');
  });
});
