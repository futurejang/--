import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { RecommendItem } from './RecommendItem';

const sampleImage = 'https://www.figma.com/api/mcp/asset/9a3c3496-f9f1-45e8-89c3-dda13cd17af8';

const meta = {
  title: 'UI/RecommendItem',
  component: RecommendItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/?node-id=8-113',
    },
  },
  args: {
    imageSrc: sampleImage,
    gameName: 'Game name',
    badgeVariant: 'pick',
  },
  argTypes: {
    badgeVariant: { control: 'inline-radio', options: ['pick', 'recommend'] },
  },
} satisfies Meta<typeof RecommendItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Recommend: Story = {
  args: { badgeVariant: 'recommend', gameName: '메이플스토리' },
};

export const Clickable: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /Game name/i });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const SideBySide: Story = {
  name: 'Default vs Hover (mouse over to see)',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-start gap-xl">
      <RecommendItem imageSrc={sampleImage} gameName="Game name" />
      <RecommendItem imageSrc={sampleImage} gameName="Game name" />
    </div>
  ),
};
