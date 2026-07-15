import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "devlog",
    template: "%s · devlog",
  },
  description: "개발 기록, 학습 정리(TIL), 프로젝트 회고를 남기는 개인 개발 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex w-full max-w-3xl items-baseline justify-between px-5 py-4">
            <Link
              href="/"
              className="font-heading text-lg font-semibold tracking-tight text-ink"
            >
              devlog
            </Link>
            <span className="font-mono text-xs text-ink-soft">
              dev notes &amp; retrospectives
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
          {children}
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto w-full max-w-3xl px-5 py-6">
            <p className="font-mono text-xs text-ink-soft">
              © {new Date().getFullYear()} devlog — 기록이 곧 포트폴리오
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
