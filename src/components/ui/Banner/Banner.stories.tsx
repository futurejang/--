import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Banner } from './Banner';

const PLACEHOLDER_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 560"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%23231245"/><stop offset="1" stop-color="%234c2470"/></linearGradient></defs><rect width="1920" height="560" fill="url(%23g)"/><text x="50%25" y="50%25" font-family="sans-serif" font-size="64" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">Banner placeholder · 1920×560</text></svg>';

const meta = {
  title: 'UI/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=45-328',
    },
  },
  args: {
    imageSrc: PLACEHOLDER_SRC,
    imageAlt: '마비노기 모바일 달밤의 늑대인간 카카오톡 이모티콘 신규출시',
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.getByAltText(/마비노기 모바일/);
    await expect(img).toBeInTheDocument();
  },
};

export const WithLink: Story = {
  args: {
    href: '/events/mabinogi',
    'aria-label': '마비노기 모바일 이벤트 페이지로 이동',
  },
  parameters: {
    docs: {
      description: {
        story: 'href를 제공하면 <a>로 렌더된다.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    onClick: fn(),
    'aria-label': '마비노기 모바일 이벤트 열기',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: '마비노기 모바일 이벤트 열기' });
    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'href 없이 onClick만 주면 <button>으로 렌더된다. 접근성을 위해 aria-label 권장.',
      },
    },
  },
};
