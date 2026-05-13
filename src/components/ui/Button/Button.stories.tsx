import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button, type ButtonSize, type ButtonState, type ButtonVariant } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=7-1079',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'lg',
    onClick: fn(),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline'] },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
    state: { control: 'inline-radio', options: [undefined, 'default', 'hover', 'press'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'Button' });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const PrimaryLarge: Story = { args: { variant: 'primary', size: 'lg' } };
export const PrimaryMedium: Story = { args: { variant: 'primary', size: 'md' } };
export const PrimarySmall: Story = { args: { variant: 'primary', size: 'sm' } };

export const SecondaryLarge: Story = { args: { variant: 'secondary', size: 'lg' } };
export const SecondaryMedium: Story = { args: { variant: 'secondary', size: 'md' } };
export const SecondarySmall: Story = { args: { variant: 'secondary', size: 'sm' } };

export const OutlineLarge: Story = { args: { variant: 'outline', size: 'lg' } };
export const OutlineMedium: Story = { args: { variant: 'outline', size: 'md' } };
export const OutlineSmall: Story = { args: { variant: 'outline', size: 'sm' } };

const variants: ButtonVariant[] = ['primary', 'secondary', 'outline'];
const sizes: ButtonSize[] = ['lg', 'md', 'sm'];
const states: ButtonState[] = ['default', 'hover', 'press'];

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-xl">
      {variants.map((variant) => (
        <section key={variant} className="flex flex-col gap-md">
          <h3 className="font-sans font-700 text-18 text-text-primary capitalize">{variant}</h3>
          <div className="grid grid-cols-[120px_repeat(3,auto)] items-center gap-x-xl gap-y-md">
            <span aria-hidden />
            {sizes.map((s) => (
              <span
                key={s}
                className="font-sans text-12 text-text-secondary uppercase tracking-wide"
              >
                {s}
              </span>
            ))}
            {states.map((state) => (
              <Fragment key={state}>
                <span className="font-sans text-13 text-text-secondary">{state}</span>
                {sizes.map((size) => (
                  <div key={size} className="flex items-start">
                    <Button variant={variant} size={size} state={state}>
                      Button
                    </Button>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

function Fragment({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
