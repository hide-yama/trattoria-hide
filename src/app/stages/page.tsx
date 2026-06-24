"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { ORDERS } from "@/data/orders";
import { isCleared, useProgress, wrongIds } from "@/lib/progress";
import { STAGES, ordersForStage } from "@/lib/stages";

const STAGE_ICON: Record<string, IconName> = {
  beginner: "sprout",
  intermediate: "wine-glass",
  dish_style: "dish",
  drink: "bottle-glass",
  pairing: "pairing",
  area: "italy-map",
  region: "map-pin",
  all: "cloche",
  wrong: "repeat",
};

const STAGE_IMAGE: Record<string, string> = {
  beginner: "/images/stages/beginner.webp",
  intermediate: "/images/stages/intermediate.webp",
  dish_style: "/images/stages/dish-style.webp",
  drink: "/images/stages/drink.webp",
  pairing: "/images/stages/pairing.webp",
  area: "/images/stages/area.webp",
  region: "/images/stages/region.webp",
  all: "/images/stages/intermediate.webp",
  wrong: "/images/stages/dish-style.webp",
};

export default function StagesPage() {
  const router = useRouter();
  const [departingStage, setDepartingStage] = useState<string | null>(null);
  const { state, hydrated } = useProgress();
  const allIds = ORDERS.map((order) => order.id);
  const wrongCount = hydrated ? wrongIds(state, allIds).length : 0;

  const getProgress = (id: string) => {
    if (id === "wrong") return { count: wrongCount, cleared: 0, pct: 0 };
    const orders = ordersForStage(id);
    const cleared = hydrated
      ? orders.filter((order) => isCleared(state, order.id)).length
      : 0;
    return {
      count: orders.length,
      cleared,
      pct: orders.length ? Math.round((cleared / orders.length) * 100) : 0,
    };
  };

  const difficulties = STAGES.filter((stage) => stage.group === "difficulty");
  const themes = STAGES.filter((stage) => stage.group === "cut");
  const specials = STAGES.filter((stage) => stage.group === "special");

  function startStage(event: MouseEvent<HTMLAnchorElement>, stageId: string) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (departingStage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      router.push(`/play?stage=${stageId}`);
      return;
    }

    setDepartingStage(stageId);
    window.setTimeout(() => {
      router.push(`/play?stage=${stageId}`);
    }, 920);
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-paper">
      <header className="border-b border-ink/10 bg-paper/90 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="group flex items-center gap-3 text-ink">
            <span className="font-display text-lg font-semibold tracking-tight">
              Trattoria <i className="text-pomodoro">Hide</i>
              <span className="ml-1 font-sans text-xs font-medium tracking-wide text-ink-soft">
                へようこそ
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium tracking-wide text-ink-soft transition hover:text-ink"
          >
            ホームへ
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </header>

      <section className="relative border-b border-ink/10">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
          <Image
            src="/images/themes/region.webp"
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/45 to-paper/10" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="font-display text-sm italic tracking-[0.14em] text-pomodoro">
              Scegli il percorso
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-ink sm:text-6xl">
              挑戦の入口を
              <br />
              選びましょう。
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-ink-soft sm:text-[15px]">
              どの入口もランダム10問のタイムアタック。難易度や、興味のあるテーマから選べます。
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <SectionHeading number="01" title="難易度から選ぶ" sub="Livelli" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {difficulties.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              icon={STAGE_ICON[stage.id]}
              progress={getProgress(stage.id)}
              large
              onStart={startStage}
            />
          ))}
        </div>

        <div className="mt-14 border-t border-ink/10 pt-12">
          <SectionHeading number="02" title="テーマから選ぶ" sub="Per tema" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                icon={STAGE_ICON[stage.id]}
                progress={getProgress(stage.id)}
                onStart={startStage}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ink/10 pt-12">
          <SectionHeading number="03" title="自由に楽しむ" sub="A piacere" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {specials.map((stage) => {
              const progress = getProgress(stage.id);
              return (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  icon={STAGE_ICON[stage.id]}
                  progress={progress}
                  large
                  disabled={stage.id === "wrong" && progress.count === 0}
                  onStart={startStage}
                />
              );
            })}
          </div>
        </div>
      </div>
      {departingStage && (
        <ServiceReveal
          label={STAGES.find((stage) => stage.id === departingStage)?.label}
        />
      )}
    </main>
  );
}

function SectionHeading({
  number,
  title,
  sub,
}: {
  number: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-end gap-4">
      <span className="font-display text-sm italic text-pomodoro">{number}</span>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="font-display text-xs italic tracking-wider text-ink-soft">
          {sub}
        </p>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  icon,
  progress,
  large = false,
  disabled = false,
  onStart,
}: {
  stage: (typeof STAGES)[number];
  icon: IconName;
  progress: { count: number; cleared: number; pct: number };
  large?: boolean;
  disabled?: boolean;
  onStart: (event: MouseEvent<HTMLAnchorElement>, stageId: string) => void;
}) {
  const content = (
    <>
      {!disabled && STAGE_IMAGE[stage.id] && (
        <div className={`pointer-events-none absolute inset-y-0 right-0 ${large ? "w-[52%]" : "w-[48%]"}`}>
          <Image
            src={STAGE_IMAGE[stage.id]}
            alt=""
            fill
            sizes={large ? "(max-width: 768px) 52vw, 300px" : "(max-width: 640px) 48vw, 220px"}
            className="object-cover object-right opacity-92 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/25 via-transparent to-cream/10" />
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border border-ink/10 bg-paper text-basil ${large ? "h-13 w-13" : "h-11 w-11"}`}
        >
          <Icon name={icon} className={large ? "h-6 w-6" : "h-5 w-5"} />
        </span>
        <span className="rounded-full bg-cream/72 px-2 py-1 font-display text-xs text-ink-soft backdrop-blur-sm">
          {stage.id === "wrong"
            ? `${progress.count}問`
            : `${progress.cleared}/${progress.count}`}
        </span>
      </div>
      <div className={`relative z-10 ${large ? "mt-7 max-w-[54%]" : "mt-5 max-w-[58%]"}`}>
        <h3 className={`${large ? "text-xl" : "text-base"} font-bold text-ink`}>
          {stage.label}
        </h3>
        <p className="mt-1 text-xs leading-5 text-ink-soft">
          {disabled ? "復習する注文はまだありません。" : stage.description}
        </p>
        {!disabled && stage.id !== "wrong" && (
          <span className="mt-3 inline-block rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-bold text-basil">
            10問 · TIME ATTACK
          </span>
        )}
      </div>
      {stage.id !== "wrong" && (
        <div className="relative z-10 mt-5 h-px overflow-hidden bg-line">
          <div
            className="h-full bg-basil transition-all"
            style={{ width: `${progress.pct}%` }}
          />
        </div>
      )}
      {!disabled && (
        <Icon
          name="arrow-right"
          className="absolute bottom-5 right-5 h-5 w-5 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-pomodoro"
        />
      )}
    </>
  );

  const classes = `group relative block overflow-hidden rounded-[1.4rem] border p-5 transition duration-300 ${
    large ? "min-h-52 sm:p-7" : "min-h-48"
  } ${
    disabled
      ? "cursor-not-allowed border-dashed border-line bg-paper-2/55 opacity-70"
      : "border-line bg-cream shadow-[0_12px_35px_-28px_rgba(43,33,24,0.7)] hover:-translate-y-1 hover:border-olive/70 hover:shadow-[0_20px_48px_-28px_rgba(43,33,24,0.65)]"
  }`;

  if (disabled) return <div className={classes}>{content}</div>;
  return (
    <Link
      href={`/play?stage=${stage.id}`}
      onClick={(event) => onStart(event, stage.id)}
      className={classes}
    >
      {content}
    </Link>
  );
}

function ServiceReveal({ label }: { label?: string }) {
  return (
    <div
      className="service-reveal fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-paper"
      aria-label={`${label ?? "注文"}を準備しています`}
      role="status"
    >
      <div className="service-reveal-glow absolute left-1/2 top-1/2 aspect-square w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(179,144,47,0.3)_0%,rgba(250,248,243,0)_70%)]" />
      <div className="relative z-10 flex -translate-y-3 flex-col items-center text-basil">
        <div className="service-cloche relative h-32 w-52">
          <svg
            viewBox="0 0 208 128"
            fill="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <g className="service-cloche-lid">
              <path
                d="M35 91c3-42 33-68 69-68s66 26 69 68H35Z"
                fill="#faf8f3"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="M91 23c0-8 5-13 13-13s13 5 13 13" stroke="currentColor" strokeWidth="3" />
            </g>
            <g className="service-cloche-tray">
              <path d="M22 94h164" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 105h184" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <p className="service-reveal-copy mt-4 font-display text-sm italic tracking-[0.14em] text-pomodoro">
          Preparando il servizio
        </p>
        <p className="service-reveal-copy mt-1 text-xs font-bold tracking-wide text-ink-soft">
          {label ?? "注文"} · 10問
        </p>
      </div>
    </div>
  );
}
