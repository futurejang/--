import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=8-89',
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pick', 'recommend', 'update'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pick: Story = {
  args: { variant: 'pick' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = await canvas.findByText('Pick');
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-background-pick');
  },
};

export const Recommend: Story = {
  args: { variant: 'recommend' },
};

export const Update: Story = {
  args: { variant: 'update' },
  parameters: {
    docs: {
      description: {
        story:
          '업데이트/신규 출시 표시용. 배경 bg-background-update(green-500), 기본 라벨 "Update".',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: { variant: 'pick', children: '특가' },
  parameters: {
    docs: {
      description: {
        story:
          'children으로 라벨을 override할 수 있다. 디자인 기본값("Pick" / "추천") 외 문구가 필요할 때 사용.',
      },
    },
  },
};

function BadgeComparison() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
      }}
    >
      <Badge variant="pick" />
      <Badge variant="recommend" />
      <Badge variant="update" />
    </div>
  );
}

export const Comparison: StoryObj = {
  render: () => <BadgeComparison />,
  parameters: { layout: 'fullscreen' },
};
