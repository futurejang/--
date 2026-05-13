import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CardImage } from './CardImage';

const img1 = 'https://example.com/image1.jpg';
const img2 = 'https://example.com/image2.jpg';

describe('CardImage', () => {
  it('renders two images', () => {
    render(<CardImage image1Src={img1} image2Src={img2} image1Alt="img1" image2Alt="img2" />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('sets correct src for each image', () => {
    render(<CardImage image1Src={img1} image2Src={img2} image1Alt="img1" image2Alt="img2" />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', img1);
    expect(images[1]).toHaveAttribute('src', img2);
  });

  it('sets alt text for both images', () => {
    render(<CardImage image1Src={img1} image2Src={img2} image1Alt="게임1" image2Alt="게임2" />);
    expect(screen.getByAltText('게임1')).toBeInTheDocument();
    expect(screen.getByAltText('게임2')).toBeInTheDocument();
  });

  it('renders with empty alt by default', () => {
    const { container } = render(<CardImage image1Src={img1} image2Src={img2} />);
    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveAttribute('alt', '');
    expect(images[1]).toHaveAttribute('alt', '');
  });

  it('applies custom className to the wrapper', () => {
    const { container } = render(
      <CardImage image1Src={img1} image2Src={img2} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
