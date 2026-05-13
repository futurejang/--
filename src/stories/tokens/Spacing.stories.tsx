import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

type SpacingToken = { name: string; varName: string; px: number };

const spacingTokens: SpacingToken[] = [
  { name: 'none', varName: '--spacing-none', px: 0 },
  { name: '3xs', varName: '--spacing-3xs', px: 2 },
  { name: 'xxs', varName: '--spacing-xxs', px: 4 },
  { name: 'xs', varName: '--spacing-xs', px: 8 },
  { name: 'sm', varName: '--spacing-sm', px: 12 },
  { name: 'md', varName: '--spacing-md', px: 16 },
  { name: 'lg', varName: '--spacing-lg', px: 20 },
  { name: 'xl', varName: '--spacing-xl', px: 24 },
  { name: '2xl', varName: '--spacing-2xl', px: 32 },
  { name: '3xl', varName: '--spacing-3xl', px: 40 },
];

function SpacingRow({ token }: { token: SpacingToken }) {
  return (
    <div
      data-testid="spacing-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 80px 1fr',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--color-background-white)',
        border: '1px solid var(--color-border-secondary)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-13)',
        color: 'var(--color-text-primary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3xs)' }}>
        <span style={{ fontWeight: 'var(--font-weight-700)' }}>{token.name}</span>
        <code style={{ fontSize: 'var(--font-size-11)', color: 'var(--color-text-secondary)' }}>
          {token.varName}
        </code>
      </div>
      <span style={{ color: 'var(--color-text-secondary)' }}>{token.px}px</span>
      <div
        style={{
          height: 16,
          width: `var(${token.varName})`,
          minWidth: 1,
          background: 'var(--color-primary-500)',
          borderRadius: 'var(--radius-xxs)',
        }}
      />
    </div>
  );
}

function StackSample({ token }: { token: SpacingToken }) {
  return (
    <div
      data-testid="stack-sample"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--color-background-white)',
        border: '1px solid var(--color-border-secondary)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-13)',
        color: 'var(--color-text-primary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3xs)' }}>
        <span style={{ fontWeight: 'var(--font-weight-700)' }}>{token.name}</span>
        <code style={{ fontSize: 'var(--font-size-11)', color: 'var(--color-text-secondary)' }}>
          gap: var({token.varName}) ({token.px}px)
        </code>
      </div>
      <div
        style={{
          display: 'flex',
          gap: `var(${token.varName})`,
          padding: 'var(--spacing-sm)',
          background: 'var(--color-background-grey)',
          borderRadius: 'var(--radius-xs)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              background: 'var(--color-primary-500)',
              borderRadius: 'var(--radius-xxs)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SpacingScale({ tokens }: { tokens: SpacingToken[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xs)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-grey)',
      }}
    >
      {tokens.map((t) => (
        <SpacingRow key={t.varName} token={t} />
      ))}
    </div>
  );
}

function GapSamples({ tokens }: { tokens: SpacingToken[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-grey)',
      }}
    >
      {tokens.map((t) => (
        <StackSample key={t.varName} token={t} />
      ))}
    </div>
  );
}

const meta = {
  title: 'Tokens/Spacing',
  component: SpacingScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SpacingScale>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  args: { tokens: spacingTokens },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = await canvas.findAllByTestId('spacing-row');
    await expect(rows.length).toBe(spacingTokens.length);
  },
};

export const GapInFlex: Story = {
  render: (args) => <GapSamples tokens={args.tokens} />,
  args: { tokens: spacingTokens.filter((t) => t.px > 0) },
};
