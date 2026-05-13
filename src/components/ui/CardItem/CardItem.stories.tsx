import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { CardItem } from './CardItem';

const sampleImage = 'https://www.figma.com/api/mcp/asset/a0bc322a-9507-4a95-a351-a7db805f8a9a';

const meta = {
  title: 'UI/CardItem',
  component: CardItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/?node-id=9-597',
    },
  },
  args: {
    imageSrc: sampleImage,
    gameName: '메이플스토리',
    gameCategory: 'MMORPG',
    showUpdateBadge: true,
    supportsDesktop: true,
    supportsMobile: true,
    layout: 'vertical',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    showUpdateBadge: { control: 'boolean' },
    supportsDesktop: { control: 'boolean' },
    supportsMobile: { control: 'boolean' },
  },
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 세로 레이아웃 (default state) */
export const Vertical: Story = {
  args: { layout: 'vertical' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const gameName = await canvas.findByText('메이플스토리');
    await expect(gameName).toBeInTheDocument();
    const category = await canvas.findByText('MMORPG');
    await expect(category).toBeInTheDocument();
    const updateBadge = await canvas.findByText('Update');
    await expect(updateBadge).toBeInTheDocument();
  },
};

/** 가로 레이아웃 */
export const Horizontal: Story = {
  args: { layout: 'horizontal' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '이미지가 왼쪽, 정보가 오른쪽에 배치되는 수평 레이아웃.',
      },
    },
  },
};

/** Update 배지 없는 버전 */
export const NoUpdateBadge: Story = {
  args: { showUpdateBadge: false },
  parameters: {
    docs: {
      description: {
        story: 'showUpdateBadge=false 시 Update 배지가 숨겨진다.',
      },
    },
  },
};

/** PC 전용 (모바일 아이콘 미표시) */
export const DesktopOnly: Story = {
  args: { supportsMobile: false },
  parameters: {
    docs: {
      description: { story: 'supportsMobile=false 시 모바일 아이콘이 사라진다.' },
    },
  },
};

/** 모바일 전용 (데스크톱 아이콘 미표시) */
export const MobileOnly: Story = {
  args: { supportsDesktop: false },
};

/** 클릭 가능한 카드 (button으로 렌더) */
export const Clickable: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** Vertical vs Horizontal 비교 */
export const LayoutComparison: Story = {
  name: 'Layout — Vertical vs Horizontal',
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xl)',
        alignItems: 'flex-start',
      }}
    >
      <CardItem
        imageSrc={sampleImage}
        gameName="메이플스토리"
        gameCategory="MMORPG"
        layout="vertical"
      />
      <CardItem
        imageSrc={sampleImage}
        gameName="메이플스토리"
        gameCategory="MMORPG"
        layout="horizontal"
      />
    </div>
  ),
};
