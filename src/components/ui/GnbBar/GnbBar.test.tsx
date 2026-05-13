import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { GnbBar } from './GnbBar';

describe('GnbBar', () => {
  it('renders a navigation landmark with the default labels', () => {
    render(<GnbBar />);
    expect(screen.getByRole('navigation', { name: 'Global navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '메뉴' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '회원가입' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('renders the NEXON logo image', () => {
    render(<GnbBar />);
    expect(screen.getByRole('img', { name: 'NEXON' })).toBeInTheDocument();
  });

  it('uses custom labels when provided', () => {
    render(<GnbBar menuLabel="Menu" signupLabel="Sign up" loginLabel="Log in" />);
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('fires the matching callback for each action', async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    const onCardClick = vi.fn();
    const onLocationClick = vi.fn();
    const onSignupClick = vi.fn();
    const onLoginClick = vi.fn();

    render(
      <GnbBar
        onMenuClick={onMenuClick}
        onCardClick={onCardClick}
        onLocationClick={onLocationClick}
        onSignupClick={onSignupClick}
        onLoginClick={onLoginClick}
      />,
    );

    await user.click(screen.getByRole('button', { name: '메뉴' }));
    await user.click(screen.getByRole('button', { name: 'card' }));
    await user.click(screen.getByRole('button', { name: 'location' }));
    await user.click(screen.getByRole('button', { name: '회원가입' }));
    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(onMenuClick).toHaveBeenCalledOnce();
    expect(onCardClick).toHaveBeenCalledOnce();
    expect(onLocationClick).toHaveBeenCalledOnce();
    expect(onSignupClick).toHaveBeenCalledOnce();
    expect(onLoginClick).toHaveBeenCalledOnce();
  });

  it('passes through className to the nav element', () => {
    render(<GnbBar className="extra-class" />);
    expect(screen.getByRole('navigation').className).toContain('extra-class');
  });
});
