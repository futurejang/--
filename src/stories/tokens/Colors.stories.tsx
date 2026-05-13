import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

type Swatch = { name: string; varName: string };

const palette = (prefix: string, scales: number[]): Swatch[] =>
  scales.map((s) => ({ name: `${prefix}-${s}`, varName: `--color-${prefix}-${s}` }));

const standardScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const alphaScale = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const palettes: { title: string; swatches: Swatch[] }[] = [
  { title: 'Primary', swatches: palette('primary', standardScale) },
  { title: 'Yellow', swatches: palette('yellow', standardScale) },
  { title: 'Blue', swatches: palette('blue', standardScale) },
  { title: 'Green', swatches: palette('green', standardScale) },
  { title: 'Grey', swatches: palette('grey', standardScale) },
  { title: 'White (alpha)', swatches: palette('white', alphaScale) },
  { title: 'Black (alpha)', swatches: palette('black', alphaScale) },
];

const semanticGroups: { title: string; swatches: Swatch[] }[] = [
  {
    title: 'Text',
    swatches: [
      { name: 'text-primary', varName: '--color-text-primary' },
      { name: 'text-secondary', varName: '--color-text-secondary' },
      { name: 'text-grey', varName: '--color-text-grey' },
      { name: 'text-inverse', varName: '--color-text-inverse' },
      { name: 'text-recommend', varName: '--color-text-recommend' },
      { name: 'text-footer-link', varName: '--color-text-footer-link' },
      { name: 'text-footer-caption', varName: '--color-text-footer-caption' },
    ],
  },
  {
    title: 'Background',
    swatches: [
      { name: 'background-white', varName: '--color-background-white' },
      { name: 'background-grey', varName: '--color-background-grey' },
      { name: 'background-active', varName: '--color-background-active' },
      { name: 'background-pressed', varName: '--color-background-pressed' },
      { name: 'background-recommend', varName: '--color-background-recommend' },
      { name: 'background-pick', varName: '--color-background-pick' },
      { name: 'background-update', varName: '--color-background-update' },
      { name: 'background-primary-btn', varName: '--color-background-primary-btn' },
      { name: 'background-secondary-btn', varName: '--color-background-secondary-btn' },
      { name: 'background-footer', varName: '--color-background-footer' },
      { name: 'background-divider', varName: '--color-background-divider' },
      { name: 'background-pagenation', varName: '--color-background-pagenation' },
    ],
  },
  {
    title: 'Border',
    swatches: [
      { name: 'border-primary', varName: '--color-border-primary' },
      { name: 'border-secondary', varName: '--color-border-secondary' },
      { name: 'border-focus', varName: '--color-border-focus' },
    ],
  },
  {
    title: 'Icon',
    swatches: [
      { name: 'icon-grey', varName: '--color-icon-grey' },
      { name: 'icon-light-grey', varName: '--color-icon-light-grey' },
    ],
  },
];

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xs)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-12)',
        color: 'var(--color-text-primary)',
      }}
      data-testid="swatch"
    >
      <div
        style={{
          width: '100%',
          height: 64,
          borderRadius: 'var(--radius-sm)',
          background: `var(${swatch.varName})`,
          border: '1px solid var(--color-border-secondary)',
          boxShadow: 'var(--shadow-sm)',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3xs)' }}>
        <span style={{ fontWeight: 'var(--font-weight-700)' }}>{swatch.name}</span>
        <code
          style={{
            fontSize: 'var(--font-size-11)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {swatch.varName}
        </code>
      </div>
    </div>
  );
}

function PaletteSection({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size-18)',
          fontWeight: 'var(--font-weight-700)',
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--spacing-md)',
        }}
      >
        {swatches.map((s) => (
          <SwatchCard key={s.varName} swatch={s} />
        ))}
      </div>
    </section>
  );
}

function ColorsCatalog({ sections }: { sections: { title: string; swatches: Swatch[] }[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3xl)',
        padding: 'var(--spacing-xl)',
        background: 'var(--color-background-white)',
      }}
    >
      {sections.map((sec) => (
        <PaletteSection key={sec.title} title={sec.title} swatches={sec.swatches} />
      ))}
    </div>
  );
}

const meta = {
  title: 'Tokens/Colors',
  component: ColorsCatalog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsCatalog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllPalettes: Story = {
  args: { sections: palettes },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const swatches = await canvas.findAllByTestId('swatch');
    const expected = palettes.reduce((n, p) => n + p.swatches.length, 0);
    await expect(swatches.length).toBe(expected);
  },
};

export const Primary: Story = {
  args: { sections: [palettes[0]] },
};

export const Yellow: Story = {
  args: { sections: [palettes[1]] },
};

export const Blue: Story = {
  args: { sections: [palettes[2]] },
};

export const Green: Story = {
  args: { sections: [palettes[3]] },
};

export const Grey: Story = {
  args: { sections: [palettes[4]] },
};

export const WhiteAlpha: Story = {
  args: { sections: [palettes[5]] },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const BlackAlpha: Story = {
  args: { sections: [palettes[6]] },
};

export const Semantic: Story = {
  args: { sections: semanticGroups },
};
