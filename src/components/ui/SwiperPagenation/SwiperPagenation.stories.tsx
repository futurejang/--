import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { SwiperPagenation } from './SwiperPagenation';

const meta = {
  title: 'UI/SwiperPagenation',
  component: SwiperPagenation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=7-1158',
    },
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#333333' }],
    },
  },
  args: {
    gameName: 'game name',
    eventName: 'event name',
    state: 'default',
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'active'] },
  },
} satisfies Meta<typeof SwiperPagenation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('game name')).toBeInTheDocument();
    await expect(canvas.getByText('event name')).toBeInTheDocument();
  },
};

export const Active: Story = {
  args: { state: 'active' },
};

export const LongEventName: Story = {
  args: {
    gameName: '메이플스토리',
    eventName: '겨울 업데이트: 한 줄을 넘어가는 매우 긴 이벤트 제목이 들어왔을 때',
    state: 'active',
  },
};

export const Clickable: Story = {
  args: {
    state: 'active',
    onClick: fn(),
    'aria-label': 'event name 슬라이드로 이동',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'event name 슬라이드로 이동' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const StatesSideBySide: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex gap-md">
      <SwiperPagenation gameName="game name" eventName="event name" state="default" />
      <SwiperPagenation gameName="game name" eventName="event name" state="active" />
    </div>
  ),
};
