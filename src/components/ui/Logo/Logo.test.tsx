import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders with default alt "NEXON"', () => {
    render(<Logo />);
    expect(screen.getByAltText('NEXON')).toBeInTheDocument();
  });

  it('applies default width 100 and proportional height 24', () => {
    render(<Logo />);
    const img = screen.getByAltText('NEXON');
    expect(img.getAttribute('width')).toBe('100');
    expect(img.getAttribute('height')).toBe('24');
  });

  it('keeps 100:24 aspect ratio when width changes', () => {
    render(<Logo width={200} />);
    const img = screen.getByAltText('NEXON');
    expect(img.getAttribute('width')).toBe('200');
    expect(img.getAttribute('height')).toBe('48');
  });

  it('accepts a custom alt label', () => {
    render(<Logo alt="GS 리테일" />);
    expect(screen.getByAltText('GS 리테일')).toBeInTheDocument();
  });

  it('treats empty alt as decorative', () => {
    const { container } = render(<Logo alt="" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('alt')).toBe('');
  });

  it('passes className through to the underlying img', () => {
    render(<Logo className="custom-class" />);
    expect(screen.getByAltText('NEXON')).toHaveClass('custom-class');
  });
});
