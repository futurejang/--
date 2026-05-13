import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'UI/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=9-151',
    },
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: [undefined, 'default', 'active', 'hover'],
    },
    selected: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'FILTER' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'FILTER' });
    await expect(btn).toHaveAttribute('data-state', 'default');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Active: Story = {
  args: { children: 'PC', selected: true },
  parameters: {
    docs: {
      description: {
        story: 'selected=true → 검정 배경 + 흰 글자. aria-pressed="true" 적용.',
      },
    },
  },
};

export const HoverForced: Story = {
  args: { children: 'MOBILE', state: 'hover' },
  parameters: {
    docs: {
      description: {
        story:
          'state="hover"로 강제 시연. 흰 배경 + 파랑 글자. 실제 hover는 default 상태에서 마우스 오버 시 자동 적용된다.',
      },
    },
  },
};

function FilterChipShowcase() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
        alignItems: 'center',
      }}
    >
      <FilterChip>FILTER</FilterChip>
      <FilterChip selected>FILTER</FilterChip>
      <FilterChip state="hover">FILTER</FilterChip>
    </div>
  );
}

export const AllStates: StoryObj = {
  render: () => <FilterChipShowcase />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'default · active(selected) · hover 세 가지 상태를 나란히 비교.',
      },
    },
  },
};
