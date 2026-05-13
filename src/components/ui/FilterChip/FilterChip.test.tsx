import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders a button with the given label', () => {
    render(<FilterChip>FILTER</FilterChip>);
    expect(screen.getByRole('button', { name: 'FILTER' })).toBeInTheDocument();
  });

  it('defaults to data-state="default" and aria-pressed="false"', () => {
    render(<FilterChip>FILTER</FilterChip>);
    const btn = screen.getByRole('button', { name: 'FILTER' });
    expect(btn).toHaveAttribute('data-state', 'default');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches to active when selected is true', () => {
    render(<FilterChip selected>PC</FilterChip>);
    const btn = screen.getByRole('button', { name: 'PC' });
    expect(btn).toHaveAttribute('data-state', 'active');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveClass('bg-background-primary-btn');
    expect(btn).toHaveClass('text-text-inverse');
  });

  it('state prop overrides selected (Storybook force)', () => {
    render(
      <FilterChip selected state="hover">
        MOBILE
      </FilterChip>,
    );
    const btn = screen.getByRole('button', { name: 'MOBILE' });
    expect(btn).toHaveAttribute('data-state', 'hover');
    expect(btn).toHaveClass('bg-background-white');
    expect(btn).toHaveClass('text-background-active');
  });

  it('applies hover utility only on default state, not on active', () => {
    const { rerender } = render(<FilterChip>FILTER</FilterChip>);
    const defaultBtn = screen.getByRole('button');
    expect(defaultBtn.className).toContain('hover:bg-background-white');

    rerender(<FilterChip selected>FILTER</FilterChip>);
    const activeBtn = screen.getByRole('button');
    expect(activeBtn.className).not.toContain('hover:bg-background-white');
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<FilterChip onClick={onClick}>FILTER</FilterChip>);
    await user.click(screen.getByRole('button', { name: 'FILTER' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders with uppercase utility and rounded-md', () => {
    render(<FilterChip>FILTER</FilterChip>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('uppercase');
    expect(btn).toHaveClass('rounded-md');
  });

  it('defaults type to "button" to avoid form submission', () => {
    render(<FilterChip>FILTER</FilterChip>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('merges custom className', () => {
    render(<FilterChip className="custom-class">FILTER</FilterChip>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('uppercase');
  });
});
