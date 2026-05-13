# 디자인 토큰 매핑 테이블

> Figma 변수명 ↔ CSS custom property ↔ Tailwind 유틸리티 매핑.
> Claude Code가 Figma 디자인 구현 시 이 문서를 참조합니다.
>
> **SSoT(Single Source of Truth)**: `tokens/*.json` (Style Dictionary 원본).
> 토큰 추가/변경은 JSON만 수정 → `npm run build:tokens` → `src/tokens/_generated.css` 자동 생성.
> `_generated.css`를 직접 수정하지 마세요.
>
> **출처**: Figma 파일 `66Hvh0jJZudXZXnKousC25` (node `3:1036`) — `get_variable_defs` 응답.

## 네이밍 규칙

Figma 변수명 → Style Dictionary JSON 경로 → CSS custom property:

| Figma | JSON 경로 | CSS Property | Tailwind utility 예시 |
|---|---|---|---|
| `primary/500`            | `color.primary.500`         | `--color-primary-500`     | `bg-primary-500`, `text-primary-500` |
| `text/primary`           | `color.text.primary`        | `--color-text-primary`    | `text-text-primary`, `bg-text-primary` |
| `background/primary btn` | `color.background.primary-btn` | `--color-background-primary-btn` | `bg-background-primary-btn` |
| `Spacing/spacing-3xs`    | `spacing.3xs`               | `--spacing-3xs`           | `p-3xs`, `m-3xs`, `gap-3xs` |
| `Radius/radius-md`       | `radius.md`                 | `--radius-md`             | `rounded-md` |
| `font size/16`           | `font.size.16`              | `--font-size-16`          | `text-16` |
| `font weight/700`        | `font.weight.700`           | `--font-weight-700`       | `font-700` |
| `line height/20`         | `line.height.20`            | `--line-height-20`        | `leading-20` |
| `shadow/sm`              | `shadow.sm`                 | `--shadow-sm`             | `shadow-sm` |

규칙 요약:
- `/` → 경로 구분자(점) → CSS는 `-`
- `%` 제거 (`White 60%` → `white-60`)
- 공백 → `-` (`primary btn` → `primary-btn`)
- 중복 prefix 압축 (`Spacing/spacing-3xs` → `spacing.3xs` → `--spacing-3xs`)

## 사용 원칙

- 화면 구현 시 **Semantic 토큰** 사용 (`--color-text-primary`, `--color-background-active` 등).
- Primitive(스케일/투명도)는 직접 쓰지 말고 Semantic을 통해 참조.
- 테이블에 없는 값 → 새 변수 만들지 말고 `/* ⚠️ 누락된 토큰 */` 플래그.

---

## 색상 — Primitive

원시 색상 스케일. **화면에서 직접 쓰지 마세요.** Semantic 토큰의 참조 대상입니다.

### primary

| Figma | CSS | 값 |
|---|---|---|
| primary/50  | --color-primary-50  | #e6f1ff |
| primary/100 | --color-primary-100 | #b1d5ff |
| primary/200 | --color-primary-200 | #8bc0ff |
| primary/300 | --color-primary-300 | #55a4ff |
| primary/400 | --color-primary-400 | #3592ff |
| primary/500 | --color-primary-500 | #0277ff |
| primary/600 | --color-primary-600 | #026ce8 |
| primary/700 | --color-primary-700 | #0154b5 |
| primary/800 | --color-primary-800 | #01418c |
| primary/900 | --color-primary-900 | #01326b |

### yellow

| Figma | CSS | 값 |
|---|---|---|
| yellow/50  | --color-yellow-50  | #fdf2e9 |
| yellow/100 | --color-yellow-100 | #f9d6bc |
| yellow/200 | --color-yellow-200 | #f7c29c |
| yellow/300 | --color-yellow-300 | #f3a66e |
| yellow/400 | --color-yellow-400 | #f19552 |
| yellow/500 | --color-yellow-500 | #ed7a27 |
| yellow/600 | --color-yellow-600 | #d86f23 |
| yellow/700 | --color-yellow-700 | #a8571c |
| yellow/800 | --color-yellow-800 | #824315 |
| yellow/900 | --color-yellow-900 | #643310 |

### blue

| Figma | CSS | 값 |
|---|---|---|
| blue/50  | --color-blue-50  | #e6fbfb |
| blue/100 | --color-blue-100 | #b0f4f1 |
| blue/200 | --color-blue-200 | #8aeeeb |
| blue/300 | --color-blue-300 | #54e7e2 |
| blue/400 | --color-blue-400 | #33e2dc |
| blue/500 | --color-blue-500 | #00dbd3 |
| blue/600 | --color-blue-600 | #00c7c0 |
| blue/700 | --color-blue-700 | #009b96 |
| blue/800 | --color-blue-800 | #007874 |
| blue/900 | --color-blue-900 | #005c59 |

### green

| Figma | CSS | 값 |
|---|---|---|
| green/50  | --color-green-50  | #eafbf2 |
| green/100 | --color-green-100 | #bef3d6 |
| green/200 | --color-green-200 | #9eedc3 |
| green/300 | --color-green-300 | #72e4a7 |
| green/400 | --color-green-400 | #56df96 |
| green/500 | --color-green-500 | #2cd77c |
| green/600 | --color-green-600 | #28c471 |
| green/700 | --color-green-700 | #1f9958 |
| green/800 | --color-green-800 | #187644 |
| green/900 | --color-green-900 | #125a34 |

### grey

| Figma | CSS | 값 |
|---|---|---|
| grey/50  | --color-grey-50  | #f9f9f9 |
| grey/100 | --color-grey-100 | #f2f2f2 |
| grey/200 | --color-grey-200 | #dddddd |
| grey/300 | --color-grey-300 | #bbbbbb |
| grey/400 | --color-grey-400 | #999999 |
| grey/500 | --color-grey-500 | #888888 |
| grey/600 | --color-grey-600 | #666666 |
| grey/700 | --color-grey-700 | #505050 |
| grey/800 | --color-grey-800 | #333333 |
| grey/900 | --color-grey-900 | #1a1a1a |

### white (불투명도 스케일)

Figma는 8자리 hex로 받지만, Style Dictionary가 `rgba()`로 변환합니다.

| Figma | CSS | 값 |
|---|---|---|
| white/White 100% | --color-white-100 | #ffffff |
| white/White 90%  | --color-white-90  | rgba(255,255,255,0.9) |
| white/White 80%  | --color-white-80  | rgba(255,255,255,0.8) |
| white/White 70%  | --color-white-70  | rgba(255,255,255,0.7) |
| white/White 60%  | --color-white-60  | rgba(255,255,255,0.6) |
| white/White 50%  | --color-white-50  | rgba(255,255,255,0.5) |
| white/White 40%  | --color-white-40  | rgba(255,255,255,0.4) |
| white/White 30%  | --color-white-30  | rgba(255,255,255,0.3) |
| white/White 20%  | --color-white-20  | rgba(255,255,255,0.2) |
| white/White 10%  | --color-white-10  | rgba(255,255,255,0.1) |

### black (불투명도 스케일)

| Figma | CSS | 값 |
|---|---|---|
| black/Black 100% | --color-black-100 | #000000 |
| black/Black 90%  | --color-black-90  | rgba(0,0,0,0.9) |
| black/Black 80%  | --color-black-80  | rgba(0,0,0,0.8) |
| black/Black 70%  | --color-black-70  | rgba(0,0,0,0.7) |
| black/Black 60%  | --color-black-60  | rgba(0,0,0,0.6) |
| black/Black 50%  | --color-black-50  | rgba(0,0,0,0.5) |
| black/Black 40%  | --color-black-40  | rgba(0,0,0,0.4) |
| black/Black 30%  | --color-black-30  | rgba(0,0,0,0.3) |
| black/Black 20%  | --color-black-20  | rgba(0,0,0,0.2) |
| black/Black 10%  | --color-black-10  | rgba(0,0,0,0.1) |

---

## 색상 — Semantic

의미적 토큰. **이걸 쓰세요.** Primitive를 참조합니다.

### text

| Figma | CSS | 참조 | Tailwind utility | 용도 |
|---|---|---|---|---|
| text/primary        | --color-text-primary        | --color-grey-900  | `text-text-primary`        | 주요 텍스트 |
| text/secondary      | --color-text-secondary      | --color-grey-600  | `text-text-secondary`      | 보조 텍스트 |
| text/grey           | --color-text-grey           | --color-grey-400  | `text-text-grey`           | 흐린 텍스트 (placeholder/disabled) |
| text/inverse        | --color-text-inverse        | --color-white-100 | `text-text-inverse`        | 어두운 배경 위 텍스트 |
| text/recommend      | --color-text-recommend      | --color-blue-500  | `text-text-recommend`      | 추천 강조 |
| text/footer link    | --color-text-footer-link    | --color-white-60  | `text-text-footer-link`    | 푸터 링크 |
| text/footer caption | --color-text-footer-caption | --color-white-50  | `text-text-footer-caption` | 푸터 캡션 |

### background

| Figma | CSS | 참조 | Tailwind utility | 용도 |
|---|---|---|---|---|
| background/white          | --color-background-white          | --color-white-100  | `bg-background-white`         | 페이지 기본 배경 |
| background/grey           | --color-background-grey           | --color-grey-50    | `bg-background-grey`          | 보조 배경 |
| background/active         | --color-background-active         | --color-primary-500 | `bg-background-active`        | 활성 / CTA |
| background/pressed        | --color-background-pressed        | --color-primary-700 | `bg-background-pressed`       | pressed 상태 |
| background/recommend      | --color-background-recommend      | --color-blue-500   | `bg-background-recommend`     | 추천 배지 |
| background/pick           | --color-background-pick           | --color-yellow-500 | `bg-background-pick`          | Pick 강조 |
| background/update         | --color-background-update         | --color-green-500  | `bg-background-update`        | 업데이트 |
| background/primary btn    | --color-background-primary-btn    | --color-grey-900   | `bg-background-primary-btn`   | 주요 버튼 |
| background/secondary btn  | --color-background-secondary-btn  | --color-grey-700   | `bg-background-secondary-btn` | 보조 버튼 |
| background/footer         | --color-background-footer         | --color-grey-800   | `bg-background-footer`        | 푸터 |
| background/divider        | --color-background-divider        | --color-white-20   | `bg-background-divider`       | 어두운 배경 구분선 |
| background/pagenation     | --color-background-pagenation     | --color-white-10   | `bg-background-pagenation`    | 페이지네이션 (Figma 원문 철자 유지) |

### border

| Figma | CSS | 참조 | Tailwind utility | 용도 |
|---|---|---|---|---|
| border/primary   | --color-border-primary   | --color-grey-900    | `border-border-primary`   | 주요 보더 |
| border/secondary | --color-border-secondary | --color-grey-300    | `border-border-secondary` | 보조 보더 |
| border/focus     | --color-border-focus     | --color-primary-600 | `border-border-focus`     | 포커스 링 |

### icon

| Figma | CSS | 참조 | Tailwind utility | 용도 |
|---|---|---|---|---|
| icon/grey       | --color-icon-grey       | --color-grey-800 | `text-icon-grey` (SVG `fill-icon-grey` 가능)       | 기본 아이콘 |
| icon/light-grey | --color-icon-light-grey | --color-grey-300 | `text-icon-light-grey` (SVG `fill-icon-light-grey`) | 흐린 아이콘 |

---

## 스페이싱

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| Spacing/spacing-none | --spacing-none | 0    | `p-none`, `m-none` |
| Spacing/spacing-3xs  | --spacing-3xs  | 2px  | `p-3xs` |
| Spacing/spacing-xxs  | --spacing-xxs  | 4px  | `p-xxs` |
| Spacing/spacing-xs   | --spacing-xs   | 8px  | `p-xs` |
| Spacing/spacing-sm   | --spacing-sm   | 12px | `p-sm` |
| Spacing/spacing-md   | --spacing-md   | 16px | `p-md` |
| Spacing/spacing-lg   | --spacing-lg   | 20px | `p-lg` |
| Spacing/spacing-xl   | --spacing-xl   | 24px | `p-xl` |
| Spacing/spacing-2xl  | --spacing-2xl  | 32px | `p-2xl` |
| Spacing/spacing-3xl  | --spacing-3xl  | 40px | `p-3xl` |

## 라운드(Radius)

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| Radius/radius-none | --radius-none | 0    | `rounded-none` |
| Radius/radius-xxs  | --radius-xxs  | 2px  | `rounded-xxs` |
| Radius/radius-xs   | --radius-xs   | 4px  | `rounded-xs` |
| Radius/radius-sm   | --radius-sm   | 8px  | `rounded-sm` |
| Radius/radius-md   | --radius-md   | 12px | `rounded-md` |
| Radius/radius-lg   | --radius-lg   | 16px | `rounded-lg` |
| Radius/radius-xl   | --radius-xl   | 24px | `rounded-xl` |

## 타이포그래피 — Primitive

### font family

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| font family/font family | --font-family | 'pretendard', sans-serif | `font-sans` |

### font size

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| font size/10 | --font-size-10 | 10px | `text-10` |
| font size/11 | --font-size-11 | 11px | `text-11` |
| font size/12 | --font-size-12 | 12px | `text-12` |
| font size/13 | --font-size-13 | 13px | `text-13` |
| font size/14 | --font-size-14 | 14px | `text-14` |
| font size/15 | --font-size-15 | 15px | `text-15` |
| font size/16 | --font-size-16 | 16px | `text-16` |
| font size/18 | --font-size-18 | 18px | `text-18` |
| font size/24 | --font-size-24 | 24px | `text-24` |
| font size/28 | --font-size-28 | 28px | `text-28` |

### font weight

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| font weight/400 | --font-weight-400 | 400 | `font-400` |
| font weight/700 | --font-weight-700 | 700 | `font-700` |

### line height

| Figma | CSS | 값 | Tailwind |
|---|---|---|---|
| line height/14 | --line-height-14 | 14px | `leading-14` |
| line height/16 | --line-height-16 | 16px | `leading-16` |
| line height/18 | --line-height-18 | 18px | `leading-18` |
| line height/20 | --line-height-20 | 20px | `leading-20` |
| line height/28 | --line-height-28 | 28px | `leading-28` |
| line height/32 | --line-height-32 | 32px | `leading-32` |

## 타이포그래피 — Semantic (조합 토큰)

Figma의 `Type/*` 스타일은 단일 토큰이 아닌 Primitive의 조합입니다.
컴포넌트에서 아래 표대로 클래스 또는 var를 조합해 적용하세요.

| Figma | family | size | weight | line-height | letter-spacing | Tailwind 조합 예시 |
|---|---|---|---|---|---|---|
| Type/H1Headline | --font-family | --font-size-28 | --font-weight-700 | --line-height-32 | 0      | `font-sans text-28 font-700 leading-32` |
| Type/H2Headline | --font-family | --font-size-24 | --font-weight-700 | --line-height-28 | 0      | `font-sans text-24 font-700 leading-28` |
| Type/S1Subtitle | --font-family | --font-size-18 | --font-weight-700 | --line-height-20 | 0      | `font-sans text-18 font-700 leading-20` |
| Type/S2Subtitle | --font-family | --font-size-16 | --font-weight-700 | --line-height-20 | 0      | `font-sans text-16 font-700 leading-20` |
| Type/B1Body     | --font-family | --font-size-15 | --font-weight-700 | --line-height-18 | 0      | `font-sans text-15 font-700 leading-18` |
| Type/B2Body     | --font-family | --font-size-14 | --font-weight-400 | --line-height-16 | 0      | `font-sans text-14 font-400 leading-16` |
| Type/B3Body     | --font-family | --font-size-14 | --font-weight-700 | --line-height-16 | 0      | `font-sans text-14 font-700 leading-16` |
| Type/B4Body     | --font-family | --font-size-13 | --font-weight-700 | --line-height-16 | 0      | `font-sans text-13 font-700 leading-16` |
| Type/B5Body     | --font-family | --font-size-12 | --font-weight-400 | --line-height-14 | 0      | `font-sans text-12 font-400 leading-14` |
| Type/C1Caption  | --font-family | --font-size-11 | --font-weight-400 | --line-height-16 | -0.3px | `font-sans text-11 font-400 leading-16 tracking-[-0.3px]` |
| Type/C2Caption  | --font-family | --font-size-10 | --font-weight-400 | --line-height-16 | -0.3px | `font-sans text-10 font-400 leading-16 tracking-[-0.3px]` |

## 효과(Shadow)

| Figma | CSS | 정의 | Tailwind |
|---|---|---|---|
| shadow/sm | --shadow-sm | `0 0 var(--spacing-sm) 0 var(--color-black-10)`         | `shadow-sm` |
| shadow/lg | --shadow-lg | `0 var(--spacing-xs) var(--spacing-xl) 0 var(--color-black-10)` | `shadow-lg` |

---

## Claude용 규칙

1. Figma MCP가 hex 색상 반환 → 이 테이블에서 찾아서 **Semantic 토큰**의 `var(--color-*)` 또는 Tailwind utility 사용 (Primitive 직접 사용 금지).
2. Figma가 스페이싱 숫자 반환 → `var(--spacing-*)` 또는 `p-*`/`m-*` utility 매핑.
3. Figma가 `Type/*` 폰트 스타일 반환 → "타이포그래피 Semantic" 표의 Tailwind 조합 그대로 적용.
4. 테이블에 없는 값 → 새 변수 만들지 말고 `/* ⚠️ 누락된 토큰 */` 플래그.
5. 토큰을 새로 추가하려면 `tokens/*.json`만 수정 → `npm run build:tokens` 실행 → 이 문서에 추가.
6. `src/tokens/_generated.css`는 자동 생성이므로 직접 수정 금지.
