import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** 홈 상단 프로필 — 히어로가 아니라 git 커밋 author 정보처럼 조용하게 */
export function Profile() {
  return (
    <div className="mb-10 flex items-center gap-4">
      <Image
        src={site.author.avatar}
        alt={`${site.author.name} 프로필 사진`}
        width={48}
        height={48}
        className="rounded-full border border-line"
      />
      <div className="min-w-0">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-heading font-semibold tracking-tight text-ink">
            {site.author.name}
          </span>
          <a
            href={site.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ink-soft hover:text-accent"
          >
            @{site.author.handle}
          </a>
        </p>
        <p className="mt-0.5 text-sm text-ink-soft">
          {site.author.bio}{" "}
          <Link
            href="/about"
            className="text-accent hover:underline hover:underline-offset-4"
          >
            more →
          </Link>
        </p>
      </div>
    </div>
  );
}
