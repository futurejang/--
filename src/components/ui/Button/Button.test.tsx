import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children inside a native button', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button.tagName).toBe('BUTTON');
  });

  it('defaults to variant="primary", size="lg", type="button"', () => {
    render(<Button>Btn</Button>);
    const button = screen.getByRole('button', { name: 'Btn' });
    expect(button.getAttribute('data-variant')).toBe('primary');
    expect(button.getAttribute('data-size')).toBe('lg');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('reflects variant and size on data attributes', () => {
    render(
      <Button variant="outline" size="sm">
        Btn
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Btn' });
    expect(button.getAttribute('data-variant')).toBe('outline');
    expect(button.getAttribute('data-size')).toBe('sm');
  });

  it('omits data-state when not provided', () => {
    render(<Button>Btn</Button>);
    expect(screen.getByRole('button').getAttribute('data-state')).toBeNull();
  });

  it('sets data-state when state prop is given', () => {
    render(<Button state="hover">Btn</Button>);
    expect(screen.getByRole('button').getAttribute('data-state')).toBe('hover');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Btn</Button>);
    await user.click(screen.getByRole('button', { name: 'Btn' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies primary variant classes', () => {
    render(<Button variant="primary">Btn</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-background-primary-btn');
    expect(button.className).toContain('text-text-inverse');
  });

  it('applies outline variant classes with border and rounded', () => {
    render(<Button variant="outline">Btn</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border-border-primary');
    expect(button.className).toContain('rounded-xl');
  });

  it('passes through className', () => {
    render(<Button className="extra">Btn</Button>);
    expect(screen.getByRole('button').className).toContain('extra');
  });

  it('respects an explicit type prop', () => {
    render(<Button type="submit">Btn</Button>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });
});
