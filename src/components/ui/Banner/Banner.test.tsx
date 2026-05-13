import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Banner } from './Banner';

const SRC = 'https://example.com/banner.png';
const ALT = '마비노기 모바일 달밤의 늑대인간';

describe('Banner', () => {
  it('renders a <div> wrapper by default (no href / no onClick)', () => {
    const { container } = render(<Banner imageSrc={SRC} imageAlt={ALT} />);
    const wrapper = container.firstElementChild!;
    expect(wrapper.tagName).toBe('DIV');
    expect(screen.getByAltText(ALT)).toHaveAttribute('src', SRC);
  });

  it('renders <a> when href is provided', () => {
    render(<Banner imageSrc={SRC} imageAlt={ALT} href="/events/mabinogi" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/events/mabinogi');
    expect(link.tagName).toBe('A');
  });

  it('renders <button> when only onClick is provided', () => {
    render(<Banner imageSrc={SRC} imageAlt={ALT} onClick={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('fires onClick when the button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Banner imageSrc={SRC} imageAlt={ALT} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('fires onClick on the link too when both href and onClick are given', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    render(
      <Banner imageSrc={SRC} imageAlt={ALT} href="/x" onClick={onClick as unknown as () => void} />,
    );
    await user.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies w-full and aspect ratio utility', () => {
    const { container } = render(<Banner imageSrc={SRC} imageAlt={ALT} />);
    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass('w-full');
    expect(wrapper.className).toContain('aspect-[24/7]');
  });

  it('passes aria-label to the interactive element', () => {
    render(
      <Banner
        imageSrc={SRC}
        imageAlt=""
        href="/x"
        aria-label="마비노기 모바일 이벤트 페이지로 이동"
      />,
    );
    expect(
      screen.getByRole('link', { name: '마비노기 모바일 이벤트 페이지로 이동' }),
    ).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(<Banner imageSrc={SRC} imageAlt={ALT} className="rounded-md" />);
    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass('rounded-md');
    expect(wrapper).toHaveClass('w-full');
  });
});
