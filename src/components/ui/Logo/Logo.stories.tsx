import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Logo } from './Logo';

const meta = {
  title: 'UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=6-1248',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = await canvas.findByAltText('NEXON');
    await expect(img).toBeInTheDocument();
    await expect(img.getAttribute('width')).toBe('100');
    await expect(img.getAttribute('height')).toBe('24');
  },
};

export const Small: Story = {
  args: { width: 60 },
};

export const Large: Story = {
  args: { width: 200 },
};

export const Decorative: Story = {
  args: { alt: '' },
  parameters: {
    docs: {
      description: {
        story:
          '주변 텍스트가 동일한 의미를 전달하는 맥락에서는 alt=""로 두어 스크린리더가 중복 안내하지 않게 한다.',
      },
    },
  },
};
