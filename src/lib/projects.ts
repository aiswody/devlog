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
    name: "ClinicalBERT + TM-HGNN",
    description:
      "MIMIC-III 임상 노트 기반 ICU 48시간 사망 예측 — ClinicalBERT 임베딩을 다층 하이퍼그래프(TM-HGNN)와 결합한 팀 프로젝트. 담당: 데이터 전처리 · ClinicalBERT baseline · GatorTronS 실험",
    repo: "https://github.com/aiswody/2025-2-OSSP-2-team5-05",
    tech: ["python", "pytorch", "clinicalbert", "hypergraph-nn"],
  },
  {
    slug: "contract-guardian",
    name: "Contract Guardian",
    description: "전월세 계약서 특약 조항 AI 위험 분석 서비스 (OCR + KLUE-RoBERTa 파인튜닝 + LLM)",
    repo: "https://github.com/aiswody/contract-guardian",
    tech: ["python", "ocr", "klue-roberta", "llm"],
  },
  {
    slug: "salesmap",
    name: "SALESMAP AI Agent",
    description:
      "영업 활동 자동화 AI 에이전트 — 메일/메신저 문장에서 일정 정보를 추출해 Gmail·Google Calendar와 연동. 종합설계1 팀 프로젝트 (Spring Boot 백엔드 + FastAPI AI 모듈)",
    repo: "https://github.com/aiswody/SALESMAP_AI_AGENT",
    tech: ["java", "spring-boot", "fastapi", "python"],
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
