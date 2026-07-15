"use client";

import { useRef, useState } from "react";

/** MDX의 pre를 감싸 복사 버튼을 붙인다 */
export function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label="코드 복사"
        className="absolute right-2 top-2 rounded border border-line bg-surface px-2 py-0.5 font-mono text-xs text-ink-soft opacity-70 transition-opacity hover:text-accent hover:opacity-100"
      >
        {copied ? "copied!" : "copy"}
      </button>
    </div>
  );
}
