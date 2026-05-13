import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

type SizeToken = { name: string; varName: string; px: number };
type WeightToken = { name: string; varName: string; value: number };
type LineHeightToken = { name: string; varName: string; px: number };

const sizeTokens: SizeToken[] = [
  { name: '10', varName: '--font-size-10', px: 10 },
  { name: '11', varName: '--font-size-11', px: 11 },
  { name: '12', varName: '--font-size-12', px: 12 },
  { name: '13', varName: '--font-size-13', px: 13 },
  { name: '14', varName: '--font-size-14', px: 14 },
  { name: '15', varName: '--font-size-15', px: 15 },
  { name: '16', varName: '--font-size-16', px: 16 },
  { name: '18', varName: '--font-size-18', px: 18 },
  { name: '24', varName: '--font-size-24', px: 24 },
  { name: '28', varName: '--font-size-28', px: 28 },
];

const weightTokens: WeightToken[] = [
  { name: 'Regular (400)', varName: '--font-weight-400', value: 400 },
  { name: 'Bold (700)', varName: '--font-weight-700', value: 700 },
];

const lineHeightTokens: LineHeightToken[] = [
  { name: '14', varName: '--line-height-14', px: 14 },
  { name: '16', varName: '--line-height-16', px: 16 },
  { name: '18', varName: '--line-height-18', px: 18 },
  { name: '20', varName: '--line-height-20', px: 20 },
  { name: '28', varName: '--line-height-28', px: 28 },
  { name: '32', varName: '--line-height-32', px: 32 },
];

const sampleText = '다람쥐 헌 쳇바퀴에 타고파 The quick brown fox 0123456789';

function Row({
  label,
  varName,
  caption,
  children,
}: {
  label: string;
  varName: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid="type-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        alignItems: 'baseline',
        gap: 'var(--spacing-lg)',
        padding: 'var(--spacing-md)',
        borderBottom: '1px solid var(--color-border-secondary)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3xs)' }}>
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-13)',
            fontWeight: 'var(--font-weight-700)',
            color: 'var(--color-text-primary)',
          }}
        >
          {label}
        </span>
        <code
          style={{
            fontSize: 'var(--font-size-11)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {varName}
        </code>
        {caption ? (
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-11)',
              color: 'var(--color-text-grey)',
            }}
          >
            {caption}
          </span>
        ) : null}
      </div>
      <div style={{ color: 'var(--color-text-primary)' }}>{children}</div>
    </div>
  );
}

function FontSizes({ tokens }: { tokens: SizeToken[] }) {
  return (
    <div
      style={{
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
        fontFamily: 'var(--font-family)',
      }}
    >
      {tokens.map((t) => (
        <Row key={t.varName} label={`size-${t.name}`} varName={t.varName} caption={`${t.px}px`}>
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: `var(${t.varName})`,
              fontWeight: 'var(--font-weight-400)',
            }}
          >
            {sampleText}
          </span>
        </Row>
      ))}
    </div>
  );
}

function FontWeights({ tokens }: { tokens: WeightToken[] }) {
  return (
    <div
      style={{
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
        fontFamily: 'var(--font-family)',
      }}
    >
      {tokens.map((t) => (
        <Row key={t.varName} label={t.name} varName={t.varName} caption={String(t.value)}>
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-18)',
              fontWeight: `var(${t.varName})`,
            }}
          >
            {sampleText}
          </span>
        </Row>
      ))}
    </div>
  );
}

function LineHeights({ tokens }: { tokens: LineHeightToken[] }) {
  const paragraph =
    '디자인 토큰은 디자인 결정의 단일 소스(single source of truth)입니다. ' +
    '같은 토큰을 React와 Flutter에서 모두 사용해 일관된 사용자 경험을 만듭니다. ' +
    'Design tokens are the single source of truth for design decisions.';
  return (
    <div
      style={{
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
        fontFamily: 'var(--font-family)',
      }}
    >
      {tokens.map((t) => (
        <Row key={t.varName} label={`line-height-${t.name}`} varName={t.varName} caption={`${t.px}px`}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-14)',
              fontWeight: 'var(--font-weight-400)',
              lineHeight: `var(${t.varName})`,
              maxWidth: 560,
            }}
          >
            {paragraph}
          </p>
        </Row>
      ))}
    </div>
  );
}

function FontFamilyShowcase() {
  return (
    <div
      style={{
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
    >
      <code
        style={{
          fontSize: 'var(--font-size-12)',
          color: 'var(--color-text-secondary)',
        }}
      >
        --font-family
      </code>
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size-28)',
          fontWeight: 'var(--font-weight-700)',
          color: 'var(--color-text-primary)',
        }}
      >
        Pretendard
      </span>
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size-16)',
          fontWeight: 'var(--font-weight-400)',
          color: 'var(--color-text-primary)',
        }}
      >
        {sampleText}
      </span>
    </div>
  );
}

const meta = {
  title: 'Tokens/Typography',
  component: FontSizes,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FontSizes>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: { tokens: sizeTokens },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = await canvas.findAllByTestId('type-row');
    await expect(rows.length).toBe(sizeTokens.length);
  },
};

export const Weights: Story = {
  render: () => <FontWeights tokens={weightTokens} />,
  args: { tokens: sizeTokens },
};

export const LineHeightsStory: Story = {
  name: 'Line Heights',
  render: () => <LineHeights tokens={lineHeightTokens} />,
  args: { tokens: sizeTokens },
};

export const FontFamily: Story = {
  render: () => <FontFamilyShowcase />,
  args: { tokens: sizeTokens },
};
