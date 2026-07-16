# devlog

> **정갈한 연구 노트 + git log.**
> 개발 기록, 학습 정리(TIL), 프로젝트 회고를 남기는 개인 블로그 — 블로그 자체가 포트폴리오의 일부입니다.

**🌐 https://devlog-opal-omega.vercel.app**

![Next.js](https://img.shields.io/badge/Next.js_15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)
![Velite](https://img.shields.io/badge/Velite-MDX-1B2130)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

---

## 왜 직접 만들었나

velog에 쓰면 5분이면 시작할 수 있다. 그런데도 직접 만든 이유는 하나 —
"이 사람 글 쓰네"가 아니라 **"이 사람이 만든 걸 보니 이렇게 일하는구나"**까지
보여주고 싶어서. 만든 과정 자체도 [첫 글](https://devlog-opal-omega.vercel.app/posts/2026-06-velite-blog-setup)로 남겨두었다.

## 특징

- **git log 스타일 홈** — 카드 그리드 대신 `날짜 + 제목 + 태그 + slug 해시` 한 줄
  리스트. 해시는 장식이 아니라 실제 URL 앵커로 동작한다.
- **타입 안전한 콘텐츠** — [Velite](https://velite.js.org)가 MDX 프론트매터를 Zod
  스키마로 검증한다. `summary`를 빼먹으면 배포 전에 빌드가 죽는다.
- **읽기 경험** — Shiki 듀얼 테마 코드 하이라이팅(+복사 버튼), 스크롤 스파이 TOC,
  이전/다음 글, 본문 17px/1.75/42rem.
- **다크모드** — 시스템 연동 + 수동 토글, FOUC 없음.
- **검색** — Fuse.js 클라이언트 퍼지 검색, `/` 키로 포커스.
- **TIL** — `type: til` 한 줄이면 짧은 학습 기록으로 분류.
- **그 외** — giscus 댓글(GitHub Discussions), 글별 OG 이미지 자동 생성, RSS, sitemap.

## 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js 15 (App Router) + TypeScript | SSG 중심 블로그에 최적 |
| 콘텐츠 | MDX + Velite | contentlayer 유지보수 중단 → Zod 기반 대안 |
| 스타일 | Tailwind CSS v4 | 커스텀 디자인 토큰만 사용, 프리셋 색상 미사용 |
| 하이라이팅 | rehype-pretty-code + Shiki | 빌드 타임 처리, 런타임 JS 부담 없음 |
| 댓글 | giscus | Git 기반 정체성과 일치, 무료 |
| 배포 | Vercel | main push 시 자동 배포 |

## 구조

```
content/posts/            # 글 (파일명 = slug, frontmatter는 Zod로 검증)
velite.config.ts          # 콘텐츠 스키마 정의
src/
├── app/                  # 홈(git log 리스트), 글 상세, til, projects, about, og, rss
├── components/           # post-list, toc, code-block, comments, theme-toggle ...
├── lib/                  # posts/projects/site 데이터 레이어
└── styles/tokens.css     # 디자인 토큰 (모든 색·폰트는 이 CSS 변수만 사용)
```

## 실행

```bash
pnpm install
pnpm dev     # http://localhost:3000 — velite가 watch 모드로 함께 돈다
pnpm build   # 프로덕션 빌드 (frontmatter 오류 시 여기서 실패)
```

## 글 쓰기

`content/posts/YYYY-MM-slug.mdx` 파일 하나 추가하고 push하면 끝.

```yaml
---
title: "글 제목"
date: 2026-07-16
tags: [nextjs, til]
summary: "목록과 OG 이미지에 쓰이는 한 줄 요약 (160자 제한)"
type: til          # 짧은 학습 기록이면. 생략 시 일반 글
project: devlog    # 연관 프로젝트 slug — 글 하단에 레포 카드 자동 렌더링
draft: true        # 프로덕션 빌드에서 제외
---
```
