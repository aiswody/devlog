export interface Project {
  /** 글 frontmatter의 project 필드와 매칭되는 slug */
  slug: string;
  name: string;
  description: string;
  /** GitHub 레포 URL — 아직 공개 전이면 생략 */
  repo?: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    slug: "ehr-mortality",
    name: "EHR Mortality Prediction",
    description:
      "MIMIC-IV 기반 ICU 사망률 예측 — 코호트 정의부터 전처리 파이프라인, 모델 학습까지",
    tech: ["python", "pandas"],
  },
  {
    slug: "contract-guardian",
    name: "Contract Guardian",
    description: "전월세 계약서 특약 조항 AI 위험 분석 서비스 (OCR + KLUE-RoBERTa 파인튜닝 + LLM)",
    repo: "https://github.com/aiswody/contract-guardian",
    tech: ["python", "ocr", "klue-roberta", "llm"],
  },
  {
    slug: "ghg",
    name: "ZEBRA",
    description: "공공건축물 온실가스 배출량 산정 및 보고 서비스",
    repo: "https://github.com/aiswody/ZEBRA",
    tech: ["javascript"],
  },
  {
    slug: "wodylog",
    name: "wodylog",
    description: "취준 일정 & 자소서 관리 트래커",
    repo: "https://github.com/aiswody/wodylog",
    tech: ["typescript"],
  },
  {
    slug: "devlog",
    name: "devlog",
    description: "이 블로그 — Next.js 15 + Velite로 직접 만든 개발 기록 공간",
    repo: "https://github.com/aiswody/devlog",
    tech: ["nextjs", "velite", "tailwind"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
