import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { SearchBar } from './SearchBar';

const meta = {
  title: 'UI/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/?node-id=9-1640',
    },
  },
  args: {
    placeholder: '게임명 검색',
    onSubmit: fn(),
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: '메이플스토리' },
};

export const FocusByTab: Story = {
  name: 'Focus (탭으로 포커스)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  },
};

export const TypeAndSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    await userEvent.type(input, '카트라이더');
    await expect(args.onChange).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole('button', { name: /search/i }));
    await expect(args.onSubmit).toHaveBeenCalledWith('카트라이더');
  },
};

export const SubmitOnEnter: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');
    await userEvent.type(input, '서든어택{Enter}');
    await expect(args.onSubmit).toHaveBeenCalledWith('서든어택');
  },
};
