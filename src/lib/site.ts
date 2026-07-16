/** 사이트 전역 설정 — 배포 후 NEXT_PUBLIC_SITE_URL 환경변수로 실제 도메인을 지정한다 */
export const site = {
  name: "devlog",
  description:
    "개발 기록, 학습 정리(TIL), 프로젝트 회고를 남기는 개인 개발 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devlog-opal-omega.vercel.app",
  author: {
    /* TODO: 실명/소개가 다르면 여기만 고치면 됨 */
    name: "이민재",
    handle: "aiswody",
    bio: "기록을 좋아하는 개발자 — 배운 것과 만든 것을 남깁니다.",
    email: "leeminjae0731@gmail.com",
    github: "https://github.com/aiswody",
    avatar: "https://avatars.githubusercontent.com/aiswody",
  },
  /** giscus (GitHub Discussions 댓글) — https://giscus.app 에서 발급한 값 */
  giscus: {
    repo: "aiswody/devlog" as `${string}/${string}`,
    repoId: "R_kgDOTZISFA",
    category: "Announcements",
    categoryId: "DIC_kwDOTZISFM4DBUJP",
  },
};
