import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import {
  getReadingArticle,
  readingArticles,
  type ArticleSection,
} from "@/data/reading-articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return readingArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getReadingArticle(slug);

  if (!article) {
    return {
      title: "記事が見つかりません | 読み物の部屋",
    };
  }

  return {
    title: `${article.shortTitle} | 読み物の部屋`,
    description: article.description,
  };
}

export default async function ReadingArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getReadingArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-paper">
      <header className="border-b border-ink/10 bg-paper/94 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/reading" className="font-display text-lg font-semibold text-ink">
            Sala di <i className="text-pomodoro">lettura</i>
          </Link>
          <Link href="/reading" className="flex items-center gap-2 text-xs font-medium text-ink-soft transition hover:text-ink">
            読み物の部屋
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </header>

      <article>
        <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1.12fr_0.88fr] md:items-center">
          <div>
            <div className="flex items-center gap-3 text-pomodoro">
              <span className="font-display text-sm italic">Caso {article.caseNumber}</span>
              <span className="h-px w-8 bg-current/40" />
              <span className="text-[10px] font-bold tracking-[0.12em]">{article.label}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.25] tracking-[-0.04em] text-ink sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-sm leading-7 text-ink-soft">{article.intro}</p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-line">
            <Image
              src={article.heroImage}
              alt={article.heroAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-right"
            />
          </div>
        </section>

        <div className="border-y border-ink/10 bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
            <p className="text-[10px] font-bold tracking-[0.14em] text-pomodoro">ORDINAZIONE</p>
            <blockquote className="mt-4 text-lg font-bold leading-8 text-ink sm:text-xl">
              {article.order}
            </blockquote>
            <p className="mt-5 rounded-2xl bg-paper-2 px-5 py-4 text-sm font-bold leading-7 text-basil">
              {article.primaryTakeaway}
            </p>
          </div>
        </div>

        <div className="reading-article mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          {article.sections.map((section, index) => (
            <SectionRenderer key={`${section.kind}-${index}`} section={section} />
          ))}

          {article.next ? (
            <section className="rounded-[1.5rem] border border-line bg-cream p-6 sm:p-8">
              <p className="font-display text-sm italic text-pomodoro">La prossima domanda</p>
              <h2 className="mt-2">{article.next.title}</h2>
              <p>{article.next.text}</p>
              {article.next.href ? (
                <Link href={article.next.href} className="mt-5 inline-flex items-center gap-2 rounded-full bg-basil px-4 py-2.5 text-xs font-bold text-cream transition hover:bg-pomodoro">
                  次の記事へ
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              ) : (
                <span className="mt-5 inline-block rounded-full bg-paper-2 px-3 py-1.5 text-[10px] font-bold text-ink-soft">
                  次の記事を準備中
                </span>
              )}
            </section>
          ) : null}

          <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-8">
            {article.previousHref ? (
              <Link href={article.previousHref} className="flex items-center gap-2 text-xs font-bold text-ink-soft transition hover:text-pomodoro">
                <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
                前の記事
              </Link>
            ) : (
              <span />
            )}
            <Link href="/reading" className="text-xs font-bold text-ink-soft transition hover:text-pomodoro">
              記事一覧へ
            </Link>
          </nav>

          <footer className="mt-10 border-t border-ink/10 pt-8">
            <p className="text-[10px] font-bold tracking-[0.12em] text-ink-soft">参考資料</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-ink-soft">
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a className="underline underline-offset-4 hover:text-pomodoro" href={source.href} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </article>
    </main>
  );
}

function SectionRenderer({ section }: { section: ArticleSection }) {
  if (section.kind === "text") {
    return (
      <section>
        <Eyebrow number={section.number} text={section.eyebrow} />
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    );
  }

  if (section.kind === "cards") {
    return (
      <section>
        <Eyebrow number={section.number} text={section.eyebrow} />
        <h2>{section.heading}</h2>
        {section.intro ? <p>{section.intro}</p> : null}
        <div className="mt-6 space-y-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border p-5 sm:p-6 ${
                card.emphasized ? "border-basil bg-basil/5" : "border-line bg-cream"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-ink">{card.title}</h3>
                <span className="text-[10px] font-bold tracking-wide text-basil">{card.badge}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "variations") {
    return (
      <section>
        <Eyebrow number={section.number} text={section.eyebrow} />
        <h2>{section.heading}</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {section.rows.map((row) => (
            <div key={row.question} className="py-5">
              <h3 className="text-sm font-bold leading-6 text-ink">{row.question}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{row.answer}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "note") {
    return (
      <aside className="my-12 rounded-[1.5rem] border border-olive/30 bg-[linear-gradient(135deg,rgba(179,144,47,0.1),rgba(255,255,255,0.75))] p-6 sm:p-8">
        <p className="font-display text-sm italic text-pomodoro">{section.eyebrow}</p>
        <h2 className="mt-2 text-xl font-bold text-ink">{section.heading}</h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm leading-7 text-ink-soft">
            {paragraph}
          </p>
        ))}
      </aside>
    );
  }

  return (
    <section>
      <Eyebrow number={section.number} text={section.eyebrow} />
      <h2>{section.heading}</h2>
      <div className="mt-6 rounded-[1.5rem] bg-basil p-6 text-cream sm:p-8">
        <p className="font-display text-4xl leading-none text-olive">“</p>
        <p className="mt-3 text-base font-bold leading-8">{section.quote}</p>
      </div>
      <p>{section.paragraph}</p>
    </section>
  );
}

function Eyebrow({ number, text }: { number: string; text: string }) {
  return (
    <p className="reading-eyebrow">
      <span>{number}</span>
      {text}
    </p>
  );
}
