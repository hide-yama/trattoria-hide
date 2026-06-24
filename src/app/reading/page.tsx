import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "読み物の部屋 | Trattoria Hideへようこそ",
  description: "お客様の注文から考え、料理と飲み物を提案する力を身につける読み物。",
};

const NEXT_QUESTIONS = [
  "酸とタンニンは何が違う？",
  "キャンティとキャンティ・クラシコは同じ？",
  "同じ品種でも味が変わるのはなぜ？",
];

export default function ReadingRoomPage() {
  return (
    <main className="min-h-dvh bg-paper">
      <ReadingHeader />

      <section className="border-b border-ink/10">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div>
            <p className="font-display text-sm italic tracking-[0.14em] text-pomodoro">
              Sala di lettura
            </p>
            <h1 className="mt-3 text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-ink sm:text-6xl">
              注文から考える、
              <br />
              読み物の部屋。
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink-soft">
            名前を暗記するのではなく、お客様の言葉から条件を読み取り、候補を比べ、理由のある提案へたどり着くためのケース集です。
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs italic tracking-[0.14em] text-pomodoro">Caso 01</p>
            <h2 className="mt-1 text-xl font-bold text-ink">注文ケース</h2>
          </div>
          <span className="text-xs text-ink-soft">読了目安 8分</span>
        </div>

        <Link
          href="/reading/tomato-pasta-red-wine"
          className="group relative mt-5 grid min-h-80 overflow-hidden rounded-[2rem] border border-line bg-cream shadow-[0_24px_70px_-45px_rgba(43,33,24,0.8)] transition duration-300 hover:-translate-y-1 hover:border-olive/70 md:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="relative z-10 flex flex-col p-7 sm:p-9">
            <span className="w-fit rounded-full bg-paper-2 px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-basil">
              ワインの提案
            </span>
            <blockquote className="mt-6 text-xl font-bold leading-9 tracking-tight text-ink sm:text-2xl">
              「トマト系のパスタに、
              <br className="hidden sm:block" />
              渋すぎない赤を」と言われたら？
            </blockquote>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
              バルベーラ、キャンティ、ヴァルポリチェッラ、プリミティーヴォ。どれも候補になる中で、何を根拠に一本を選ぶのか。
            </p>
            <span className="mt-auto flex items-center gap-2 pt-8 text-xs font-bold text-pomodoro">
              注文を読み解く
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="relative min-h-64 md:min-h-full">
            <Image
              src="/images/stages/drink.webp"
              alt="赤ワインのグラスとボトル"
              fill
              sizes="(max-width: 768px) 100vw, 430px"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/15 to-transparent md:block" />
          </div>
        </Link>

        <Link
          href="/reading/barbera-grape-or-wine"
          className="group mt-5 grid overflow-hidden rounded-[1.6rem] border border-line bg-cream shadow-[0_18px_52px_-42px_rgba(43,33,24,0.75)] transition duration-300 hover:-translate-y-1 hover:border-olive/70 sm:grid-cols-[1fr_14rem]"
        >
          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs italic text-pomodoro">Caso 02</span>
              <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-bold text-basil">名前を読み解く</span>
            </div>
            <h3 className="mt-4 text-xl font-bold leading-8 text-ink">「バルベーラをください」と言われたら、何を確認する？</h3>
            <p className="mt-3 text-sm leading-7 text-ink-soft">品種が分かっても一本は決まらない。呼称、造り方、料理から「同じようなもの」を具体化します。</p>
            <span className="mt-5 flex items-center gap-2 text-xs font-bold text-pomodoro">続きを読む<Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
          <div className="relative min-h-52 sm:min-h-full">
            <Image src="/images/stages/intermediate.webp" alt="赤ワインとテイスティングノート" fill sizes="(max-width: 640px) 100vw, 224px" className="object-cover object-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/75 via-transparent to-transparent" />
          </div>
        </Link>

        <div className="mt-14 border-t border-ink/10 pt-10">
          <p className="font-display text-xs italic tracking-[0.14em] text-pomodoro">Domande successive</p>
          <h2 className="mt-1 text-xl font-bold text-ink">この注文から、次の疑問へ</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {NEXT_QUESTIONS.map((question, index) => (
              <div key={question} className="rounded-2xl border border-dashed border-line bg-cream/45 p-5">
                <span className="font-display text-xs text-pomodoro">{String(index + 3).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-bold leading-6 text-ink">{question}</p>
                <span className="mt-3 block text-[10px] tracking-wide text-ink-soft">準備中</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReadingHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper/94 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          Trattoria <i className="text-pomodoro">Hide</i>
          <span className="ml-1 font-sans text-xs font-medium text-ink-soft">へようこそ</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-xs font-medium text-ink-soft transition hover:text-ink">
          ホームへ
          <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
        </Link>
      </div>
    </header>
  );
}
