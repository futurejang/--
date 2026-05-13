import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CardImage } from './CardImage';

const sampleImage1 = 'https://www.figma.com/api/mcp/asset/6c4b2804-2b6d-4978-bd05-5ad6d3c498f4';
const sampleImage2 = 'https://www.figma.com/api/mcp/asset/0a2ab2c3-0b4a-48d6-9d5a-09e1cf9d0f51';

const meta = {
  title: 'UI/CardImage',
  component: CardImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/?node-id=9-420',
    },
  },
  args: {
    image1Src: sampleImage1,
    image2Src: sampleImage2,
    image1Alt: '메이플스토리',
    image2Alt: 'FC ONLINE',
  },
  argTypes: {
    image1Src: { control: 'text' },
    image2Src: { control: 'text' },
    image1Alt: { control: 'text' },
    image2Alt: { control: 'text' },
  },
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 두 장 썸네일 배치 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const images = await canvas.findAllByRole('img');
    await expect(images).toHaveLength(2);
    await expect(images[0]).toHaveAttribute('alt', '메이플스토리');
    await expect(images[1]).toHaveAttribute('alt', 'FC ONLINE');
  },
};

/** alt 텍스트 없이도 렌더링 */
export const NoAlt: Story = {
  args: {
    image1Alt: '',
    image2Alt: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'alt 속성을 빈 문자열로 전달하면 장식용 이미지로 처리된다.',
      },
    },
  },
};

/** 커스텀 className 적용 */
export const WithCustomClass: Story = {
  args: {
    className: 'rounded-sm overflow-hidden',
  },
  parameters: {
    docs: {
      description: {
        story: 'className prop으로 외부 스타일을 추가할 수 있다.',
      },
    },
  },
};
