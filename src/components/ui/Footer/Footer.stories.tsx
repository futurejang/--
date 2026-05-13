import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Footer } from './Footer';

const meta = {
  title: 'UI/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66Hvh0jJZudXZXnKousC25/-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%8B%E1%85%AD%E1%86%BC--%EB%84%A5%EC%8A%A8-%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7--Copy-?node-id=10-454',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('이용약관')).toBeInTheDocument();
    await expect(canvas.getByText('회사소개')).toBeInTheDocument();
    await expect(
      canvas.getByText(/NEXON Korea Corporation All Rights Reserved\./),
    ).toBeInTheDocument();
  },
};

export const WithHrefs: Story = {
  args: {
    primaryLinks: [
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
      { label: '청소년보호정책', href: '/youth' },
      { label: '게임IP사용가이드', href: '/ip-guide' },
      { label: '게임시간선택제', href: '/play-time' },
      { label: '고객센터', href: '/help' },
      { label: '전체서비스', href: '/services' },
    ],
    secondaryLinks: [
      { label: '회사소개', href: '/about' },
      { label: '채용안내', href: '/careers' },
      { label: '윤리경영', href: '/ethics' },
      { label: '넥슨브랜드가이드', href: '/brand' },
      { label: '광고문의', href: '/ads' },
      { label: '넥슨PC방', href: '/pcbang' },
      { label: '넥슨에센셜', href: '/essential' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'href를 제공하면 링크가 <a>로 렌더되고 hover/focus 스타일이 적용된다.',
      },
    },
  },
};

export const CustomBrand: Story = {
  args: {
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
    secondaryLinks: [
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    companyInfo: ['ACME Corp. | 123 Main St. | hello@acme.com'],
    copyright: '© 2026 ACME Corp. All rights reserved.',
  },
  parameters: {
    docs: {
      description: {
        story: '라벨/회사 정보/카피라이트를 통째로 교체해 다른 브랜드에 재사용.',
      },
    },
  },
};
