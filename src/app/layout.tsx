import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { site } from "@/lib/site";
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
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
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
            <nav className="flex items-baseline gap-5 font-mono text-sm">
              <Link
                href="/projects"
                className="text-ink-soft hover:text-accent"
              >
                projects
              </Link>
              <Link href="/about" className="text-ink-soft hover:text-accent">
                about
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
          {children}
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto w-full max-w-3xl px-5 py-6">
            <p className="flex flex-wrap justify-between gap-2 font-mono text-xs text-ink-soft">
              <span>© {new Date().getFullYear()} devlog — 기록이 곧 포트폴리오</span>
              <span className="flex gap-4">
                <a
                  href={site.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  github
                </a>
                <a href="/rss.xml" className="hover:text-accent">
                  rss
                </a>
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
