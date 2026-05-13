import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { CardItem } from './CardItem';

const defaultProps = {
  imageSrc: 'https://example.com/game.jpg',
  gameName: '메이플스토리',
  gameCategory: 'MMORPG',
};

describe('CardItem', () => {
  it('게임 이름을 렌더링한다', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByText('메이플스토리')).toBeInTheDocument();
  });

  it('게임 카테고리를 렌더링한다', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByText('MMORPG')).toBeInTheDocument();
  });

  it('썸네일 이미지를 렌더링한다', () => {
    render(<CardItem {...defaultProps} />);
    const img = screen.getByAltText('메이플스토리');
    expect(img).toHaveAttribute('src', defaultProps.imageSrc);
  });

  it('imageAlt가 없으면 gameName을 alt로 사용한다', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByAltText('메이플스토리')).toBeInTheDocument();
  });

  it('imageAlt를 명시하면 해당 alt를 사용한다', () => {
    render(<CardItem {...defaultProps} imageAlt="커스텀 alt" />);
    expect(screen.getByAltText('커스텀 alt')).toBeInTheDocument();
  });

  it('showUpdateBadge=true 이면 Update 배지를 표시한다', () => {
    render(<CardItem {...defaultProps} showUpdateBadge />);
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  it('showUpdateBadge=false 이면 Update 배지를 숨긴다', () => {
    render(<CardItem {...defaultProps} showUpdateBadge={false} />);
    expect(screen.queryByText('Update')).not.toBeInTheDocument();
  });

  it('supportsDesktop=true 이면 데스크톱 아이콘을 표시한다', () => {
    render(<CardItem {...defaultProps} supportsDesktop />);
    expect(screen.getByLabelText('PC 지원')).toBeInTheDocument();
  });

  it('supportsDesktop=false 이면 데스크톱 아이콘을 숨긴다', () => {
    render(<CardItem {...defaultProps} supportsDesktop={false} />);
    expect(screen.queryByLabelText('PC 지원')).not.toBeInTheDocument();
  });

  it('supportsMobile=true 이면 모바일 아이콘을 표시한다', () => {
    render(<CardItem {...defaultProps} supportsMobile />);
    expect(screen.getByLabelText('모바일 지원')).toBeInTheDocument();
  });

  it('supportsMobile=false 이면 모바일 아이콘을 숨긴다', () => {
    render(<CardItem {...defaultProps} supportsMobile={false} />);
    expect(screen.queryByLabelText('모바일 지원')).not.toBeInTheDocument();
  });

  it('onClick 없으면 article 태그로 렌더링한다', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('onClick이 있으면 button 태그로 렌더링한다', () => {
    render(<CardItem {...defaultProps} onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const handleClick = vi.fn();
    render(<CardItem {...defaultProps} onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('layout=vertical 이면 세로 레이아웃 클래스를 갖는다', () => {
    render(<CardItem {...defaultProps} layout="vertical" />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('flex-col');
  });

  it('layout=horizontal 이면 가로 레이아웃 클래스를 갖는다', () => {
    render(<CardItem {...defaultProps} layout="horizontal" />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('flex-row');
  });

  it('custom className이 루트 요소에 적용된다', () => {
    render(<CardItem {...defaultProps} className="custom-card" />);
    expect(screen.getByRole('article')).toHaveClass('custom-card');
  });
});
