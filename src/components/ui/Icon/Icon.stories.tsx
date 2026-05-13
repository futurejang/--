import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Icon, type IconName } from './Icon';

const ALL_NAMES: IconName[] = [
  'newpage',
  'menu',
  'chevronLeft',
  'chevronRight',
  'search',
  'location',
  'desktop',
  'mobile',
  'card',
];

const meta = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=5-1437',
    },
  },
  argTypes: {
    name: { control: 'select', options: ALL_NAMES },
    size: { control: { type: 'number', min: 12, max: 64, step: 1 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'search', 'aria-label': 'Search' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = await canvas.findByRole('img', { name: 'Search' });
    await expect(icon).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: { name: 'location', size: 48, 'aria-label': 'Location' },
};

export const Decorative: Story = {
  args: { name: 'menu' },
  parameters: {
    docs: {
      description: {
        story: 'aria-label 미지정 시 aria-hidden=true가 적용되어 스크린리더가 무시한다.',
      },
    },
  },
};

export const Colored: Story = {
  args: {
    name: 'location',
    className: 'text-primary-500',
    'aria-label': 'Highlighted location',
  },
  parameters: {
    docs: {
      description: {
        story:
          'SVG가 fill="currentColor"로 정규화되어 부모의 color 토큰을 상속한다. className으로 색상 토큰을 override할 수 있다.',
      },
    },
  },
};

function IconGallery() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
      }}
    >
      {ALL_NAMES.map((n) => (
        <div
          key={n}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-md)',
            border: '1px solid var(--color-border-secondary)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-background-white)',
          }}
        >
          <Icon name={n} aria-label={n} />
          <code
            style={{
              fontSize: 'var(--font-size-12)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {n}
          </code>
        </div>
      ))}
    </div>
  );
}

export const Gallery: StoryObj = {
  render: () => <IconGallery />,
  parameters: { layout: 'fullscreen' },
};
