import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SwiperPagenation } from './SwiperPagenation';

describe('SwiperPagenation', () => {
  it('renders gameName and eventName text', () => {
    render(<SwiperPagenation gameName="메이플" eventName="겨울 업데이트" />);
    expect(screen.getByText('메이플')).toBeInTheDocument();
    expect(screen.getByText('겨울 업데이트')).toBeInTheDocument();
  });

  it('defaults to state="default" and uses the pagenation background class', () => {
    const { container } = render(<SwiperPagenation gameName="g" eventName="e" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-state')).toBe('default');
    expect(root.className).toContain('bg-background-pagenation');
  });

  it('applies the active background when state="active"', () => {
    const { container } = render(<SwiperPagenation gameName="g" eventName="e" state="active" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('data-state')).toBe('active');
    expect(root.className).toContain('bg-background-active');
  });

  it('renders as <div> when onClick is not provided', () => {
    const { container } = render(<SwiperPagenation gameName="g" eventName="e" />);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('renders as <button type="button"> when onClick is provided', () => {
    render(<SwiperPagenation gameName="g" eventName="e" onClick={() => {}} aria-label="go" />);
    const button = screen.getByRole('button', { name: 'go' });
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('fires onClick when the button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SwiperPagenation gameName="g" eventName="e" onClick={onClick} aria-label="go" />);
    await user.click(screen.getByRole('button', { name: 'go' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies truncate to the eventName span', () => {
    render(<SwiperPagenation gameName="g" eventName="long event" />);
    expect(screen.getByText('long event').className).toContain('truncate');
  });

  it('passes className through to the root', () => {
    const { container } = render(
      <SwiperPagenation gameName="g" eventName="e" className="extra-class" />,
    );
    expect((container.firstElementChild as HTMLElement).className).toContain('extra-class');
  });
});
