import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "about",
  description: "이 블로그와 글쓴이 소개",
};

/* TODO: 이름/학교/경력 등 본인 소개로 다듬을 것 */
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl">
      <p aria-hidden className="font-mono text-xs text-ink-soft">
        $ whoami
      </p>
      <h1 className="mt-2 font-heading text-xl font-semibold tracking-tight text-ink">
        About
      </h1>

      <div className="prose mt-6">
        <p>
          기록을 좋아하는 개발자입니다. 배운 것과 만든 것을 그때그때 이곳에
          남깁니다. 화려한 결과보다 과정의 삽질과 선택의 이유를 남기는 데
          관심이 많습니다.
        </p>
        <p>
          헬스케어 데이터(EHR) 분석, 온실가스 산정 서비스, 취준 일정 트래커처럼
          실생활의 문제를 코드로 푸는 프로젝트를 해왔습니다. 각 프로젝트의
          자세한 내용은 projects 페이지에 있습니다.
        </p>
        <p>
          이 블로그 자체도 포트폴리오의 일부입니다. Next.js 15와 Velite로
          직접 만들었고, 소스는 GitHub에 공개되어 있습니다.
        </p>
      </div>

      <dl className="mt-10 space-y-2 border-t border-line pt-6 font-mono text-sm">
        <div className="flex gap-4">
          <dt className="w-16 shrink-0 text-ink-soft">github</dt>
          <dd>
            <a
              href={site.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline hover:underline-offset-4"
            >
              github.com/aiswody
            </a>
          </dd>
        </div>
        <div className="flex gap-4">
          <dt className="w-16 shrink-0 text-ink-soft">email</dt>
          <dd>
            <a
              href={`mailto:${site.author.email}`}
              className="text-accent hover:underline hover:underline-offset-4"
            >
              {site.author.email}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
