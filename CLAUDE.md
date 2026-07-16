# 개발 블로그 프로젝트 스펙 (CLAUDE.md 겸용)

> 이 문서를 프로젝트 루트에 `CLAUDE.md`로 두고 Claude Code로 개발을 시작한다.
> Phase 순서대로 진행하며, 각 Phase 완료 시 커밋한다.

---

## 1. 프로젝트 개요

- **무엇**: 개인 개발 블로그 + 포트폴리오 허브. 개발 기록, 학습 정리(TIL), 프로젝트 회고를 올리는 공간.
- **누가 보나**: 채용 담당자, 동료 개발자.
- **핵심 목표**: (1) 글이 읽기 편할 것, (2) 템플릿 느낌이 아니라 직접 만든 티가 날 것, (3) 블로그 자체가 하나의 기술 포트폴리오가 될 것.
- **배포**: GitHub 레포 → Vercel 자동 배포 (main 브랜치 push 시).

## 2. 기술 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 15 (App Router) + TypeScript | 취업 시장 표준 조합, SSG로 블로그에 최적 |
| 콘텐츠 | MDX + **Velite** | Velite는 콘텐츠를 타입 안전하게 관리(Zod 스키마 기반). contentlayer는 유지보수 중단이라 쓰지 않는다 |
| 스타일 | Tailwind CSS v4 | 커스텀 디자인 토큰 기반으로 사용. 기본 프리셋 색상 사용 금지 |
| 코드 하이라이팅 | **rehype-pretty-code + Shiki** | VS Code 급 하이라이팅. prism 기본 테마는 "AI 티" 나므로 금지 |
| 다크모드 | next-themes | 시스템 연동 + 토글 |
| 댓글 | **giscus** (GitHub Discussions 기반) | Git 기반 정체성과 일치, 무료, 광고 없음 |
| OG 이미지 | @vercel/og | 글마다 공유 썸네일 자동 생성 |
| 애니메이션 | CSS transition 우선, 필요 시 motion(구 framer-motion) 최소 사용 | 과한 스크롤 애니메이션은 오히려 템플릿처럼 보임 |
| 패키지 매니저 | pnpm | 설치 속도와 디스크 효율 |

## 3. 초기 세팅 커맨드

```bash
# Next.js 프로젝트 생성 — TypeScript, Tailwind, App Router, src 디렉토리 사용
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# 콘텐츠 파이프라인 — MDX를 타입 안전하게 빌드하기 위해 velite 사용
pnpm add velite

# 코드 하이라이팅 — 빌드 타임에 Shiki로 하이라이팅해서 런타임 JS 부담 없음
pnpm add rehype-pretty-code shiki

# MDX 부가 플러그인 — GFM(표/체크박스), 제목 자동 링크, 수식(추후 AI 글용)
pnpm add remark-gfm rehype-slug rehype-autolink-headings remark-math rehype-katex

# 다크모드 — 시스템 설정 감지 + 수동 토글, FOUC 방지 처리 내장
pnpm add next-themes

# 날짜 포맷 — 가볍고 표준적
pnpm add date-fns
```

## 4. 폴더 구조

```
.
├── CLAUDE.md                  # 이 문서
├── velite.config.ts           # 콘텐츠 스키마 정의
├── content/
│   ├── posts/                 # 블로그 글 (평평하게, 파일명 = slug)
│   │   └── 2026-07-mimic-preprocessing.mdx
│   └── projects/              # 프로젝트 소개 페이지용 MDX
├── public/
│   └── images/posts/<slug>/   # 글별 이미지
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # 홈 = 글 목록 (아래 "시그니처" 참고)
│   │   ├── posts/[slug]/page.tsx
│   │   ├── projects/page.tsx  # 포트폴리오 프로젝트 목록
│   │   ├── tags/[tag]/page.tsx
│   │   ├── about/page.tsx
│   │   └── og/route.tsx       # @vercel/og 동적 OG 이미지
│   ├── components/
│   └── styles/tokens.css      # 디자인 토큰 (CSS 변수)
└── .claude/settings.json
```

### 콘텐츠 스키마 (velite.config.ts)

```ts
// posts 컬렉션 필드
{
  title: s.string(),
  date: s.isodate(),
  tags: s.array(s.string()),
  summary: s.string().max(160),   // 목록/OG 설명용
  project: s.string().optional(), // 연관 프로젝트 slug (ehr-mortality, ghg, wodylog 등)
  draft: s.boolean().default(false),
}
```

`project` 필드가 있으면 글 하단에 해당 프로젝트 GitHub 레포 링크 카드를 자동 렌더링한다.

## 5. 디자인 방향 (중요 — 그대로 따를 것)

**콘셉트: "정갈한 연구 노트 + git log".** 화려한 랜딩이 아니라, 기록 그 자체가 주인공인 조용하고 밀도 있는 지면. 아래 토큰과 시그니처를 벗어나지 않는다.

### 금지 사항 (템플릿/AI 생성 티 방지)
- 크림색 배경(#F4F1EA 계열) + 세리프 대제목 + 테라코타 포인트 조합 금지
- 검정 배경 + 형광 초록/버밀리언 단일 포인트 조합 금지
- 그라데이션 텍스트, 글래스모피즘 카드, 이유 없는 01/02/03 넘버링 금지
- 히어로에 큰 숫자 + 통계 배지 나열 금지
- 스크롤마다 fade-in 되는 애니메이션 남발 금지

### 컬러 토큰
```css
--bg:        #F7F8FA;  /* 아주 옅은 쿨 그레이 화이트 */
--surface:   #FFFFFF;
--ink:       #1B2130;  /* 본문 — 순검정 대신 잉크 네이비 */
--ink-soft:  #5B6472;  /* 보조 텍스트 */
--accent:    #0E6E63;  /* 딥 틸 — 링크, 태그, 포커스 */
--line:      #E3E6EB;  /* 헤어라인 */
/* 다크모드: --bg #12151C, --surface #1A1E27, --ink #E8EAEF, --accent #3FB8A9 */
```

### 타이포그래피
- **본문**: Pretendard Variable (한글 웹 표준, CDN 또는 self-host)
- **제목**: Space Grotesk (라틴) + Pretendard 폴백 — 세리프 대신 개성 있는 그로테스크
- **날짜/메타/코드**: JetBrains Mono
- 본문 17px / line-height 1.75 / 콘텐츠 최대 폭 42rem. 읽기 편함이 최우선.

### 시그니처 요소 (이 블로그를 기억하게 만드는 한 가지)
홈 화면의 글 목록을 **git log 스타일 리스트**로 만든다:
- 카드 그리드가 아니라 1열 리스트. 각 행 = `모노스페이스 날짜(YYYY.MM.DD)` + 제목 + 태그.
- 각 글에 slug 기반 짧은 해시(예: `a3f9c21`)를 mono로 흐리게 표시 — 장식이 아니라 글의 고유 ID로 실제 URL 앵커에도 사용.
- hover 시 행 전체에 옅은 accent 배경. 그 외 애니메이션 없음.
- 나머지 화면(글 본문, about)은 조용하고 절제되게. 화려함은 이 목록 하나에만 쓴다.

### 품질 기준
- 모바일(360px)까지 반응형, 키보드 포커스 링 가시화, `prefers-reduced-motion` 존중
- Lighthouse 성능/접근성 95+ 목표

## 6. 개발 로드맵 (Phase별로 커밋)

**Phase 1 — 골격**: 프로젝트 생성, Velite 파이프라인, 디자인 토큰, 홈(git log 리스트) + 글 상세 페이지. 샘플 글 2개 포함.
**Phase 2 — 읽기 경험**: rehype-pretty-code 코드 블록(복사 버튼 포함), 목차(TOC) 사이드바, 이전/다음 글 내비게이션, 태그 페이지.
**Phase 3 — 정체성**: about 페이지, projects 페이지(EHR/GHG/Wodylog 레포 링크 카드), OG 이미지 자동 생성, RSS(`feed` 패키지) + sitemap.
**Phase 4 — 인터랙션**: 다크모드 토글, giscus 댓글, 클라이언트 검색(Fuse.js).
**Phase 5 — 배포/확장**: Vercel 연결, 커스텀 도메인(선택), 조회수(Upstash Redis, 선택).

## 7. 글 작성 컨벤션

- 파일명: `YYYY-MM-slug.mdx` (예: `2026-07-mimic-preprocessing.mdx`)
- 글 구성 권장: 무엇을 하려 했나 → 무엇을 했나 → 어떤 기술을 어떻게 썼나 → 배운 점
- 이미지: `public/images/posts/<slug>/`에 두고 상대 경로 참조
- 초안은 `draft: true`로 두면 프로덕션 빌드에서 제외

## 8. Claude Code 작업 규칙

- 커밋 메시지: conventional commits (`feat:`, `fix:`, `style:`, `content:`)
- 컴포넌트는 서버 컴포넌트 우선, 인터랙션 필요한 것만 `"use client"`
- 색상/폰트는 반드시 `tokens.css`의 CSS 변수만 사용 (Tailwind arbitrary 색상값 금지)
- 외부 UI 라이브러리(shadcn 등) 사용 금지 — 직접 만든 티가 나야 함
- 각 Phase 완료 시 `pnpm build`로 프로덕션 빌드 통과 확인 후 커밋
- **빌드 전에 dev 서버를 끈다** — dev와 build가 `.next`를 공유해 동시 실행 시 산출물이 섞임

## 9. 글 작성 워크플로우 (운영 단계 — Phase 1~5 완료됨)

블로그는 https://devlog-opal-omega.vercel.app 에 배포되어 있다 (main push 시 자동 배포).
새 글 작성은 `/write-post` 명령어를 사용한다 (`.claude/commands/write-post.md`에 절차·문체 가이드).

- 다른 폴더의 프로젝트를 글로 쓸 때: 이 폴더(devlog)에서 세션을 열고 대상 경로나 레포명을 알려주면 된다 — 다른 폴더를 직접 읽을 수 있다.
- 글은 실제 사실 기반으로만 쓴다. 자료에 없는 경험·심경은 지어내지 말고 사용자에게 묻는다.
- 팀 프로젝트 글은 팀원 실명 없이 ("5인 팀"), 본인 담당 파트를 명확히 쓴다.
