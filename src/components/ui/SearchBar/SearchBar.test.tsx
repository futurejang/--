import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders a search input with the default placeholder', () => {
    render(<SearchBar />);
    const input = screen.getByRole('searchbox');
    expect(input.getAttribute('placeholder')).toBe('게임명 검색');
  });

  it('uses a custom placeholder when provided', () => {
    render(<SearchBar placeholder="검색어를 입력하세요" />);
    expect(screen.getByRole('searchbox').getAttribute('placeholder')).toBe('검색어를 입력하세요');
  });

  it('exposes the form as a search landmark', () => {
    render(<SearchBar />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('renders an accessible search button', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('typing fires onChange with each new value (uncontrolled)', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar onChange={onChange} />);
    await user.type(screen.getByRole('searchbox'), 'abc');
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });

  it('submits the current value when the search button is clicked', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} defaultValue="hello" />);
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSubmit).toHaveBeenCalledWith('hello');
  });

  it('submits the current value when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SearchBar onSubmit={onSubmit} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'world{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('world');
  });

  it('respects controlled value and ignores internal state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="fixed" onChange={onChange} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('fixed');
    await user.type(input, 'X');
    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe('fixed');
  });

  it('passes className through to the form element', () => {
    const { container } = render(<SearchBar className="extra" />);
    expect(container.querySelector('form')?.className).toContain('extra');
  });
});
