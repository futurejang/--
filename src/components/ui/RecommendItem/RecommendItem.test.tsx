import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { RecommendItem } from './RecommendItem';

const IMG = 'https://example.com/cover.png';

describe('RecommendItem', () => {
  it('renders the game name and the default Pick badge', () => {
    render(<RecommendItem imageSrc={IMG} gameName="메이플스토리" />);
    expect(screen.getByText('메이플스토리')).toBeInTheDocument();
    expect(screen.getByText('Pick')).toBeInTheDocument();
  });

  it('uses gameName as image alt when imageAlt is omitted', () => {
    render(<RecommendItem imageSrc={IMG} gameName="카트라이더" />);
    expect(screen.getByRole('img', { name: '카트라이더' })).toBeInTheDocument();
  });

  it('uses the provided imageAlt when supplied', () => {
    render(<RecommendItem imageSrc={IMG} gameName="X" imageAlt="custom alt" />);
    expect(screen.getByRole('img', { name: 'custom alt' })).toBeInTheDocument();
  });

  it('renders recommend badge when badgeVariant="recommend"', () => {
    render(<RecommendItem imageSrc={IMG} gameName="X" badgeVariant="recommend" />);
    expect(screen.getByText('추천')).toBeInTheDocument();
  });

  it('renders as <article> when onClick is not provided', () => {
    const { container } = render(<RecommendItem imageSrc={IMG} gameName="X" />);
    expect(container.querySelector('article')).not.toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders as <button> and fires onClick when provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<RecommendItem imageSrc={IMG} gameName="X" onClick={onClick} />);
    const button = screen.getByRole('button', { name: /X/ });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('allows overriding the badge label', () => {
    render(<RecommendItem imageSrc={IMG} gameName="X" badgeLabel="NEW" />);
    expect(screen.getByText('NEW')).toBeInTheDocument();
    expect(screen.queryByText('Pick')).toBeNull();
  });

  it('passes className through to the root element', () => {
    const { container } = render(
      <RecommendItem imageSrc={IMG} gameName="X" className="extra-class" />,
    );
    expect(container.firstChild).toHaveClass('extra-class');
  });
});
