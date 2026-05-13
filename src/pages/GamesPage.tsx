import { useState } from 'react';

import { Banner } from '../components/ui/Banner';
import { Button } from '../components/ui/Button';
import { CardItem } from '../components/ui/CardItem';
import { FilterChip } from '../components/ui/FilterChip';
import { Footer } from '../components/ui/Footer';
import { GnbBar } from '../components/ui/GnbBar';
import { Icon } from '../components/ui/Icon';
import { RecommendItem } from '../components/ui/RecommendItem';
import { SearchBar } from '../components/ui/SearchBar';

// ─── 데이터 ─────────────────────────────────────────────────────────────────

const FILTER_CHIPS = [
  '전체',
  '얼리스테이지',
  'Windows',
  'macOS',
  'Steam',
  'EPIC',
  'Android',
  'iOS',
  'PlayStation',
  'XBOX',
  'SWITCH',
  'SWITCH2',
  'RPG',
  '액션 RPG',
  '캐주얼',
  'FPS',
  'AOS/MOBA',
  '이벤트',
];

interface RecommendGameData {
  id: number;
  gameName: string;
  imageSrc: string;
  badgeVariant: 'pick' | 'recommend';
}

const RECOMMEND_GAMES: RecommendGameData[] = [
  {
    id: 1,
    gameName: '메이플스토리',
    imageSrc: '/images/showcase/recommend-01.jpg',
    badgeVariant: 'pick',
  },
  {
    id: 2,
    gameName: '던전앤파이터',
    imageSrc: '/images/showcase/recommend-02.jpg',
    badgeVariant: 'pick',
  },
  {
    id: 3,
    gameName: 'FC 온라인',
    imageSrc: '/images/showcase/recommend-03.jpg',
    badgeVariant: 'pick',
  },
  {
    id: 4,
    gameName: '마비노기',
    imageSrc: '/images/showcase/recommend-04.jpg',
    badgeVariant: 'recommend',
  },
  {
    id: 5,
    gameName: '바람의나라',
    imageSrc: '/images/showcase/recommend-05.jpg',
    badgeVariant: 'recommend',
  },
];

interface CardGameData {
  id: number;
  gameName: string;
  gameCategory: string;
  imageSrc: string;
  showUpdateBadge?: boolean;
  supportsDesktop?: boolean;
  supportsMobile?: boolean;
}

const CARD_GAMES: CardGameData[] = [
  {
    id: 1,
    gameName: '메이플스토리',
    gameCategory: 'MMORPG',
    imageSrc: '/images/showcase/card-01.jpg',
    showUpdateBadge: true,
    supportsDesktop: true,
    supportsMobile: false,
  },
  {
    id: 2,
    gameName: '던전앤파이터',
    gameCategory: '액션 RPG',
    imageSrc: '/images/showcase/card-02.jpg',
    showUpdateBadge: true,
    supportsDesktop: true,
    supportsMobile: true,
  },
  {
    id: 3,
    gameName: '카트라이더: 드리프트',
    gameCategory: '레이싱',
    imageSrc: '/images/showcase/card-03.jpg',
    showUpdateBadge: false,
    supportsDesktop: true,
    supportsMobile: true,
  },
  {
    id: 4,
    gameName: '마비노기',
    gameCategory: 'MMORPG',
    imageSrc: '/images/showcase/card-04.jpg',
    showUpdateBadge: true,
    supportsDesktop: true,
    supportsMobile: false,
  },
  {
    id: 5,
    gameName: '바람의나라',
    gameCategory: 'MMORPG',
    imageSrc: '/images/showcase/card-05.jpg',
    showUpdateBadge: false,
    supportsDesktop: true,
    supportsMobile: false,
  },
  {
    id: 6,
    gameName: 'FC 온라인',
    gameCategory: '스포츠',
    imageSrc: '/images/showcase/card-06.jpg',
    showUpdateBadge: true,
    supportsDesktop: true,
    supportsMobile: false,
  },
  {
    id: 7,
    gameName: '히트2',
    gameCategory: '액션 RPG',
    imageSrc: '/images/showcase/card-07.jpg',
    showUpdateBadge: false,
    supportsDesktop: false,
    supportsMobile: true,
  },
  {
    id: 8,
    gameName: '블루 아카이브',
    gameCategory: 'RPG',
    imageSrc: '/images/showcase/card-08.jpg',
    showUpdateBadge: true,
    supportsDesktop: false,
    supportsMobile: true,
  },
];

// ─── 페이지 컴포넌트 ──────────────────────────────────────────────────────────

export function GamesPage() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--color-background-grey)',
        minHeight: '100vh',
      }}
    >
      {/* GNB — 풀블리드 */}
      <GnbBar />

      {/* 히어로 배너 — 풀블리드 */}
      <Banner imageSrc="/images/showcase/banner-hero.jpg" imageAlt="넥슨 게임 히어로 배너" />

      {/* 콘텐츠 컨테이너 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1280,
          paddingTop: 80,
          paddingBottom: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 59,
        }}
      >
        {/* ── Section 1: 추천게임 + 로그인 패널 ─────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--spacing-lg)',
            alignItems: 'flex-end',
          }}
        >
          {/* 추천게임 섹션 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-xl)',
              flexShrink: 0,
            }}
          >
            {/* 헤더: 제목 + 해시태그 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-28)',
                  fontWeight: 'var(--font-weight-700)',
                  lineHeight: 'var(--line-height-32)',
                  color: 'var(--color-text-primary)',
                }}
              >
                추천게임
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-16)',
                  fontWeight: 'var(--font-weight-700)',
                  lineHeight: 'var(--line-height-20)',
                  color: 'var(--color-text-recommend)',
                }}
              >
                #최근에 많이 검색된
              </span>
            </div>

            {/* RecommendItem 리스트 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 'var(--spacing-xs)',
              }}
            >
              {RECOMMEND_GAMES.map((game) => (
                <RecommendItem
                  key={game.id}
                  imageSrc={game.imageSrc}
                  gameName={game.gameName}
                  badgeVariant={game.badgeVariant}
                />
              ))}
            </div>
          </div>

          {/* 로그인 패널 */}
          <div
            style={{
              flex: 1,
              height: 324,
              backgroundColor: 'var(--color-background-white)',
              padding: '60px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              justifyContent: 'center',
            }}
          >
            {/* 로그인 버튼 그룹 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-xxs)',
                width: '100%',
              }}
            >
              <Button variant="primary" size="lg" className="w-full">
                NEXON ID 로그인
              </Button>
              <div style={{ display: 'flex', gap: 0, width: '100%' }}>
                <Button variant="secondary" size="md" className="flex-1">
                  일회용 로그인
                </Button>
                <Button variant="secondary" size="md" className="flex-1">
                  QR 로그인
                </Button>
              </div>
            </div>

            {/* 링크 그룹 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                <a
                  href="#"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-12)',
                    fontFamily: 'var(--font-family)',
                    textDecoration: 'none',
                    lineHeight: 'var(--line-height-14)',
                  }}
                >
                  넥슨 ID 찾기
                </a>
                <a
                  href="#"
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: 'var(--font-size-12)',
                    fontFamily: 'var(--font-family)',
                    textDecoration: 'none',
                    lineHeight: 'var(--line-height-14)',
                  }}
                >
                  비밀번호 찾기
                </a>
              </div>
              <a
                href="#"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-size-12)',
                  fontFamily: 'var(--font-family)',
                  textDecoration: 'none',
                  lineHeight: 'var(--line-height-14)',
                }}
              >
                회원가입
              </a>
            </div>
          </div>
        </div>

        {/* ── Section 2: 전체게임 ───────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)',
          }}
        >
          {/* 헤더 row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'flex-end' }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-28)',
                  fontWeight: 'var(--font-weight-700)',
                  lineHeight: 'var(--line-height-32)',
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                전체 게임
              </h2>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-xs)',
                  alignItems: 'center',
                }}
              >
                <a
                  href="#"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-size-14)',
                    fontWeight: 'var(--font-weight-400)',
                    lineHeight: 'var(--line-height-16)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  모바일게임 커뮤니티 모아보기
                </a>
                <Icon name="newpage" size={24} aria-label="새 페이지로 이동" />
              </div>
            </div>
            <div style={{ width: 300, flexShrink: 0 }}>
              <SearchBar placeholder="게임명 검색" value={searchValue} onChange={setSearchValue} />
            </div>
          </div>

          {/* 필터 바 */}
          <div
            style={{
              backgroundColor: 'var(--color-background-white)',
              padding: 'var(--spacing-2xl)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-md)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {FILTER_CHIPS.map((label, index) => (
              <FilterChip
                key={label}
                selected={selectedFilter === index}
                onClick={() => setSelectedFilter(index)}
              >
                #{label}
              </FilterChip>
            ))}
          </div>

          {/* 카드 그리드 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              rowGap: 50,
              columnGap: 'var(--spacing-xl)',
              width: '100%',
            }}
          >
            {CARD_GAMES.map((game) => (
              <CardItem
                key={game.id}
                imageSrc={game.imageSrc}
                gameName={game.gameName}
                gameCategory={game.gameCategory}
                showUpdateBadge={game.showUpdateBadge}
                supportsDesktop={game.supportsDesktop}
                supportsMobile={game.supportsMobile}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 — 풀블리드 */}
      <Footer />
    </div>
  );
}
