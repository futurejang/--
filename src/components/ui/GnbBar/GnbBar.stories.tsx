import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { GnbBar } from './GnbBar';

const meta = {
  title: 'UI/GnbBar',
  component: GnbBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/?node-id=7-1156',
    },
  },
  args: {
    menuLabel: '메뉴',
    signupLabel: '회원가입',
    loginLabel: '로그인',
    logoAlt: 'NEXON',
    onMenuClick: fn(),
    onCardClick: fn(),
    onLocationClick: fn(),
    onSignupClick: fn(),
    onLoginClick: fn(),
  },
} satisfies Meta<typeof GnbBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('navigation', { name: 'Global navigation' })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: '메뉴' }));
    await expect(args.onMenuClick).toHaveBeenCalledOnce();

    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(args.onLoginClick).toHaveBeenCalledOnce();

    await userEvent.click(canvas.getByRole('button', { name: '회원가입' }));
    await expect(args.onSignupClick).toHaveBeenCalledOnce();
  },
};

export const Canvas1280: Story = {
  name: 'Figma 캔버스(1280px)',
  parameters: { layout: 'centered' },
  render: (args) => (
    <div className="w-[1280px]">
      <GnbBar {...args} />
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    menuLabel: 'Menu',
    signupLabel: 'Sign up',
    loginLabel: 'Log in',
  },
};
