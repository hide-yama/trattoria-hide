"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { ORDERS } from "@/data/orders";
import { computeStats, useProgress } from "@/lib/progress";

export default function Home() {
  const { state, hydrated } = useProgress();
  const stats = computeStats(
    state,
    ORDERS.map((order) => order.id),
  );

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-paper">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/trattoria-interior.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,246,236,0.98)_0%,rgba(251,246,236,0.91)_40%,rgba(251,246,236,0.5)_67%,rgba(43,33,24,0.13)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,246,236,0.35)_0%,transparent_38%,rgba(43,33,24,0.18)_100%)]" />
      </div>

      <div className="relative mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-14">
        <section className="min-w-0 max-w-xl">
          <div className="flex items-center gap-3 text-pomodoro">
            <span className="h-px w-10 bg-current" />
            <p className="font-display text-sm italic tracking-[0.15em]">
              Osteria · Enoteca
            </p>
          </div>

          <h1 className="mt-4 text-ink">
            <span className="block font-display text-[clamp(4.2rem,8.5vw,7rem)] font-semibold leading-[0.8] tracking-[-0.055em]">
              Trattoria
            </span>
            <span className="mt-2 flex flex-wrap items-baseline gap-x-3 pl-[0.08em]">
              <span className="font-display text-[clamp(4.2rem,8.5vw,7rem)] font-semibold italic leading-[0.8] tracking-[-0.055em] text-pomodoro">
                Hide
              </span>
              <span className="text-lg font-medium tracking-[0.08em] text-ink/85 sm:text-xl">
                へようこそ
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-7 text-ink/85 sm:text-base">
            一皿の背景にある土地、料理、飲み物を読み解く。
            <br className="hidden sm:block" />
            トラットリアの注文から学ぶ、イタリア食文化ゲームです。
          </p>

          <Link
            href="/play?stage=all"
            className="group mt-8 flex max-w-md items-center justify-between rounded-[1.35rem] bg-basil px-6 py-5 text-cream shadow-[0_20px_55px_-24px_rgba(50,76,31,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-basil-deep hover:shadow-[0_24px_65px_-26px_rgba(50,76,31,1)]"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10">
                <Icon name="cloche" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-base font-bold tracking-wide">
                  今日の注文を始める
                </span>
                <span className="mt-0.5 block text-xs text-cream/85">
                  全{stats.total}問からランダム10問
                </span>
              </span>
            </span>
            <Icon
              name="arrow-right"
              className="h-6 w-6 transition-transform group-hover:translate-x-1"
            />
          </Link>

          <div className="mt-7 flex max-w-md items-center divide-x divide-ink/15 border-y border-ink/15 py-3">
            <Stat
              value={hydrated ? `${stats.cleared}/${stats.total}` : "—"}
              label="クリア"
            />
            <Stat
              value={hydrated && stats.answered > 0 ? `${stats.avgBest}` : "—"}
              label="平均点"
            />
            <Stat
              value={hydrated ? `${stats.answered}` : "—"}
              label="挑戦済み"
            />
          </div>
        </section>

        <section className="min-w-0 self-center rounded-[2rem] border border-cream/70 bg-cream/88 p-4 shadow-[0_30px_90px_-42px_rgba(43,33,24,0.8)] backdrop-blur-md sm:p-5">
          <div className="flex items-end justify-between px-1 pb-4">
            <div>
              <p className="font-display text-xs italic tracking-[0.14em] text-pomodoro">
                Scegli il percorso
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">
                どう学びますか？
              </h2>
            </div>
            <span className="hidden text-xs text-ink-soft sm:block">
              続きからいつでも
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MenuCard
              href="/stages"
              icon="menu-book"
              image="/images/themes/region.webp"
              title="ステージを選ぶ"
              sub="Livelli"
              desc="難易度やテーマから選択"
            />
            <MenuCard
              href="/play?stage=wrong"
              icon="repeat"
              image="/images/themes/cuisine.webp"
              title="苦手を復習する"
              sub="Ripasso"
              desc="間違えた注文だけ再挑戦"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <SoonCard icon="study-book" title="学習部屋" sub="Studio" />
            <CompactLink href="/answers" icon="collection" title="答え集" sub="Risposte" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 flex-1 px-3 text-center first:pl-0 last:pr-0">
      <div className="font-display text-xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-[11px] tracking-wide text-ink-soft">{label}</div>
    </div>
  );
}

function MenuCard({
  href,
  icon,
  image,
  title,
  sub,
  desc,
}: {
  href: string;
  icon: IconName;
  image: string;
  title: string;
  sub: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-56 overflow-hidden rounded-[1.4rem] border border-line bg-paper shadow-sm transition duration-300 hover:-translate-y-1 hover:border-olive/70 hover:shadow-xl"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 260px"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 bg-ink/25 backdrop-blur-sm">
            <Icon name={icon} className="h-5 w-5" />
          </span>
          <span className="font-display text-xs italic text-cream/85">{sub}</span>
        </div>
        <h3 className="font-bold tracking-wide">{title}</h3>
        <p className="mt-0.5 text-xs text-cream/85">{desc}</p>
      </div>
    </Link>
  );
}

function SoonCard({
  icon,
  title,
  sub,
}: {
  icon: IconName;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-paper/60 px-4 py-3 text-ink-soft">
      <Icon name={icon} className="h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink/80">{title}</span>
          <span className="hidden font-display text-[10px] italic sm:inline">
            {sub}
          </span>
        </div>
        <span className="text-[10px] tracking-wide">近日公開</span>
      </div>
    </div>
  );
}

function CompactLink({
  href,
  icon,
  title,
  sub,
}: {
  href: string;
  icon: IconName;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-line bg-cream px-4 py-3 text-ink transition hover:border-olive"
    >
      <Icon name={icon} className="h-5 w-5 shrink-0 text-basil" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{title}</span>
          <span className="hidden font-display text-[10px] italic text-ink-soft sm:inline">
            {sub}
          </span>
        </div>
        <span className="text-[10px] tracking-wide text-ink-soft">全問題を一覧で確認</span>
      </div>
      <Icon name="arrow-right" className="h-4 w-4 text-ink-soft transition group-hover:translate-x-0.5" />
    </Link>
  );
}
