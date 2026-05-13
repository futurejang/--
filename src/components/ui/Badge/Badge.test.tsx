import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders default label "Pick" for pick variant', () => {
    render(<Badge variant="pick" />);
    expect(screen.getByText('Pick')).toBeInTheDocument();
  });

  it('renders default label "추천" for recommend variant', () => {
    render(<Badge variant="recommend" />);
    expect(screen.getByText('추천')).toBeInTheDocument();
  });

  it('renders default label "Update" for update variant', () => {
    render(<Badge variant="update" />);
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('applies bg-background-pick class for pick variant', () => {
    render(<Badge variant="pick" />);
    expect(screen.getByText('Pick')).toHaveClass('bg-background-pick');
  });

  it('applies bg-background-recommend class for recommend variant', () => {
    render(<Badge variant="recommend" />);
    expect(screen.getByText('추천')).toHaveClass('bg-background-recommend');
  });

  it('applies bg-background-update class for update variant', () => {
    render(<Badge variant="update" />);
    expect(screen.getByText('Update')).toHaveClass('bg-background-update');
  });

  it('children overrides the default label', () => {
    render(<Badge variant="pick">특가</Badge>);
    expect(screen.getByText('특가')).toBeInTheDocument();
    expect(screen.queryByText('Pick')).not.toBeInTheDocument();
  });

  it('merges custom className while keeping defaults', () => {
    render(
      <Badge variant="pick" className="custom-class">
        Pick
      </Badge>,
    );
    const badge = screen.getByText('Pick');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('text-text-inverse');
  });

  it('uses inverse text color and pill shape', () => {
    render(<Badge variant="pick" />);
    const badge = screen.getByText('Pick');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('text-text-inverse');
  });
});
