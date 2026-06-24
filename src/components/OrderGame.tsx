"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useProgress } from "@/lib/progress";
import { googleImageSearchUrl } from "@/lib/image-search";
import {
  grade,
  VERDICT_LABEL,
  type Selection,
  type Verdict,
} from "@/lib/scoring";
import { ANSWER_TYPE_LABEL, type Order } from "@/lib/types";

const DIFFICULTY_LABEL: Record<Order["difficulty"], string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
};

const VERDICT_STYLE: Record<Verdict, string> = {
  perfect: "bg-basil text-cream",
  good: "bg-olive text-cream",
  near: "bg-pomodoro text-cream",
  off: "bg-ink-soft text-cream",
};

const THEME_IMAGE: Record<string, string> = {
  dish_style: "/images/themes/cuisine.webp",
  drink: "/images/themes/wine.webp",
  pairing: "/images/themes/pairing.webp",
  area: "/images/themes/region.webp",
  region: "/images/themes/region.webp",
};

const SESSION_SIZE = 10;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

interface PlayedResult {
  order: Order;
  score: number;
  verdict: Verdict;
}

interface InspectedChoice {
  answerType: string;
  choiceId: string;
}

function shuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

function prepareQueue(orders: readonly Order[]): Order[] {
  return shuffle(orders).slice(0, SESSION_SIZE).map((order) => ({
    ...order,
    slots: order.slots.map((slot) => ({
      ...slot,
      choices: shuffle(slot.choices),
    })),
  }));
}

export default function OrderGame({
  orders,
  stageLabel,
}: {
  orders: Order[];
  stageLabel: string;
}) {
  const initialOrders = useRef(orders);
  const [queue, setQueue] = useState<Order[]>([]);
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState<Selection>({});
  const [submitted, setSubmitted] = useState(false);
  const [showOrderFace, setShowOrderFace] = useState(true);
  const [inspected, setInspected] = useState<InspectedChoice | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  const [results, setResults] = useState<PlayedResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { record } = useProgress();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQueue(prepareQueue(initialOrders.current));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const order = queue[index];
  const total = queue.length;
  const allAnswered = order
    ? order.slots.every((slot) => selection[slot.answerType])
    : false;

  useEffect(() => {
    if (!order || submitted || finished) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [order, submitted, finished]);

  const result = useMemo(
    () => (submitted && order ? grade(order, selection) : null),
    [submitted, order, selection],
  );

  function choose(answerType: string, choiceId: string) {
    if (!submitted) {
      setSelection((current) => ({ ...current, [answerType]: choiceId }));
      return;
    }

    const key = `${answerType}:${choiceId}`;
    setInspected({ answerType, choiceId });
    setShowOrderFace(false);
    setRevealedKeys((current) =>
      current.includes(key) ? current : [...current, key],
    );
  }

  function submit() {
    if (!allAnswered || !order) return;
    const graded = grade(order, selection);
    record(order.id, graded.totalScore);
    setResults((current) => [
      ...current,
      { order, score: graded.totalScore, verdict: graded.verdict },
    ]);
    const firstSlot = order.slots[0];
    if (firstSlot) {
      setInspected({
        answerType: firstSlot.answerType,
        choiceId: selection[firstSlot.answerType],
      });
    }
    setRevealedKeys(
      order.slots.map(
        (slot) => `${slot.answerType}:${selection[slot.answerType]}`,
      ),
    );
    setShowOrderFace(false);
    setSubmitted(true);
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
      return;
    }
    setSelection({});
    setSubmitted(false);
    setShowOrderFace(true);
    setInspected(null);
    setRevealedKeys([]);
    setIndex((current) => current + 1);
  }

  function restart(newQueue: Order[]) {
    setQueue(prepareQueue(newQueue));
    setIndex(0);
    setSelection({});
    setSubmitted(false);
    setShowOrderFace(true);
    setInspected(null);
    setRevealedKeys([]);
    setResults([]);
    setElapsedSeconds(0);
    setFinished(false);
  }

  if (finished) {
    const average = Math.round(
      results.reduce((sum, played) => sum + played.score, 0) /
        Math.max(results.length, 1),
    );
    const perfectCount = results.filter(
      (played) => played.verdict === "perfect",
    ).length;
    const wrong = results.filter((played) => played.score < 60);

    return (
      <div className="min-h-dvh bg-paper">
        <TopBar stageLabel={stageLabel} index={total} total={total} elapsedSeconds={elapsedSeconds} />
        <main className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-16">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/images/themes/trattoria.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 text-cream">
              <Icon name="laurel" className="h-10 w-10 text-olive" />
              <p className="mt-3 font-display text-sm italic tracking-wider text-cream/75">
                Servizio completo
              </p>
              <p className="mt-1 text-xl font-bold">サービスを終えました</p>
            </div>
          </div>

          <section>
            <p className="font-display text-sm italic tracking-[0.14em] text-pomodoro">
              Il risultato
            </p>
            <div className="mt-2 flex items-start gap-2">
              <span className="font-display text-8xl font-semibold leading-none tracking-[-0.06em] text-ink">
                {average}
              </span>
              <span className="mt-3 text-sm font-bold text-ink-soft">点</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              全{results.length}問中、満点は
              <strong className="mx-1 text-basil">{perfectCount}問</strong>。
              {wrong.length > 0
                ? `振り返りたい注文が${wrong.length}問あります。`
                : "すべての注文にしっかり応えられました。"}
            </p>

            <div className="mt-5 inline-flex items-baseline gap-2 rounded-full border border-line bg-cream px-4 py-2">
              <span className="text-[10px] font-bold tracking-[0.12em] text-ink-soft">TIME</span>
              <span className="font-display text-xl font-semibold tabular-nums text-ink">
                {formatTime(elapsedSeconds)}
              </span>
            </div>

            {wrong.length > 0 && (
              <div className="mt-6 space-y-2 border-l border-pomodoro/30 pl-4">
                {wrong.map((played) => (
                  <p key={played.order.id} className="text-xs leading-5 text-ink-soft">
                    <strong className="mr-2 font-display text-pomodoro">
                      {played.score}
                    </strong>
                    {played.order.orderText}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {wrong.length > 0 && (
                <button
                  type="button"
                  onClick={() => restart(wrong.map((played) => played.order))}
                  className="rounded-full bg-pomodoro px-5 py-3 text-sm font-bold text-cream transition hover:bg-pomodoro-deep"
                >
                  間違いだけ再挑戦
                </button>
              )}
              <button
                type="button"
                onClick={() => restart(orders)}
                className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition hover:bg-basil"
              >
                もう一度
              </button>
              <Link
                href="/stages"
                className="rounded-full border border-line bg-cream px-5 py-3 text-sm font-bold text-ink transition hover:border-olive"
              >
                ステージを選ぶ
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-dvh bg-paper">
        <TopBar stageLabel={stageLabel} index={0} total={Math.min(orders.length, SESSION_SIZE)} elapsedSeconds={elapsedSeconds} />
        <div className="flex min-h-[55dvh] items-center justify-center">
          <span className="font-display text-sm italic tracking-wider text-ink-soft">
            Preparando il servizio…
          </span>
        </div>
      </div>
    );
  }

  const themeImage = THEME_IMAGE[order.stageType] ?? "/images/themes/trattoria.webp";
  const inspectedSlot = inspected
    ? order.slots.find((slot) => slot.answerType === inspected.answerType)
    : undefined;
  const inspectedChoice = inspectedSlot?.choices.find(
    (choice) => choice.id === inspected?.choiceId,
  );
  const inspectedBest = inspectedSlot?.choices.reduce((best, choice) =>
    choice.score > best.score ? choice : best,
  );
  const inspectedWasChosen = inspected
    ? selection[inspected.answerType] === inspected.choiceId
    : false;

  return (
    <div className="min-h-dvh bg-paper">
      <TopBar stageLabel={stageLabel} index={index + 1} total={total} elapsedSeconds={elapsedSeconds} />

      <main className="mx-auto grid w-full max-w-6xl gap-7 px-5 py-8 sm:px-8 md:min-h-[calc(100dvh-73px)] md:grid-cols-[0.82fr_1.18fr] md:items-center md:py-12 lg:gap-12 lg:px-10">
        <aside
          data-flipped={submitted && !showOrderFace ? "true" : "false"}
          className="order-card-flip h-[31rem] min-w-0 sm:h-[33rem] md:h-[34rem]"
        >
          <div className="order-card-flip-inner">
            <div
              aria-hidden={submitted && !showOrderFace}
              className="order-card-face overflow-hidden rounded-[1.8rem] border border-line bg-cream shadow-[0_24px_70px_-42px_rgba(43,33,24,0.8)]"
            >
              <div className="relative h-36 sm:h-44">
                <Image
                  src={themeImage}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-cream">
                  <p className="font-display text-sm italic tracking-wider">
                    Ordinazione
                  </p>
                  <span className="rounded-full border border-cream/35 bg-ink/20 px-3 py-1 text-[10px] font-bold backdrop-blur-sm">
                    {DIFFICULTY_LABEL[order.difficulty]}
                  </span>
                </div>
              </div>

              <div className="flex h-[calc(100%-9rem)] flex-col p-6 sm:h-[calc(100%-11rem)] sm:p-7">
                <div className="flex gap-4">
                  <span className="font-display text-5xl leading-[0.7] text-pomodoro/55">
                    “
                  </span>
                  <p className="text-[15px] leading-7 text-ink sm:text-base">
                    {order.orderText}
                  </p>
                </div>
                <div className="mt-auto border-t border-line pt-4">
                  <p className="font-display text-xs italic tracking-wide text-ink-soft">
                    Tavolo n.{String(index + 1).padStart(2, "0")} · Trattoria Hide
                  </p>
                  {submitted && (
                    <button
                      type="button"
                      tabIndex={showOrderFace ? 0 : -1}
                      onClick={() => setShowOrderFace(false)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line py-3 text-xs font-bold text-ink transition hover:border-basil hover:text-basil"
                    >
                      解説に戻る
                      <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              aria-hidden={!submitted || showOrderFace}
              className="order-card-face order-card-back overflow-hidden rounded-[1.8rem] border border-line bg-cream shadow-[0_24px_70px_-42px_rgba(43,33,24,0.8)]"
            >
              {result && inspectedSlot && inspectedChoice && inspectedBest && (
                <div className="flex h-full flex-col">
                  <div className="border-b border-line bg-paper/70 px-6 py-5 sm:px-7">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-display text-sm italic tracking-[0.12em] text-pomodoro">
                          Il risultato
                        </p>
                        <p className="mt-1 text-xs font-medium text-ink-soft">提案の解説</p>
                      </div>
                      <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${VERDICT_STYLE[result.verdict]}`}>
                        総合 {result.totalScore}点 · {VERDICT_LABEL[result.verdict]}
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-2 border-l-2 border-pomodoro/35 pl-3 text-xs leading-5 text-ink-soft">
                      {order.orderText}
                    </p>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col px-6 py-5 sm:px-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold tracking-[0.12em] text-pomodoro">
                            {ANSWER_TYPE_LABEL[inspectedSlot.answerType]}
                          </span>
                          {inspectedWasChosen && (
                            <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-bold text-ink-soft">
                              選んだ提案
                            </span>
                          )}
                          {inspectedChoice.score === inspectedBest.score && (
                            <span className="rounded-full bg-basil/10 px-2.5 py-1 text-[10px] font-bold text-basil">
                              最も自然
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-sm font-bold leading-6 text-ink">
                          {inspectedChoice.label}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-display text-4xl font-semibold leading-none text-ink">
                          {inspectedChoice.score}
                        </span>
                        <span className="ml-1 text-xs font-bold text-ink-soft">点</span>
                      </div>
                    </div>

                    <p className="mt-4 text-[13px] leading-6 text-ink-soft">
                      {inspectedChoice.feedback}
                    </p>

                    <a
                      href={googleImageSearchUrl(inspectedChoice.label)}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={!showOrderFace ? 0 : -1}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-basil underline decoration-basil/25 underline-offset-4 transition hover:text-pomodoro hover:decoration-pomodoro/35"
                    >
                      Google画像で見る
                      <Icon name="arrow-right" className="h-3.5 w-3.5 -rotate-45" />
                    </a>

                    {inspectedChoice.score < inspectedBest.score && (
                      <button
                        type="button"
                        tabIndex={!showOrderFace ? 0 : -1}
                        onClick={() => choose(inspectedSlot.answerType, inspectedBest.id)}
                        className="mt-4 flex w-full items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3 text-left transition hover:bg-paper-2"
                      >
                        <span className="min-w-0">
                          <span className="block text-[10px] font-bold tracking-wide text-basil">
                            最も自然な提案を見る
                          </span>
                          <span className="mt-0.5 block truncate text-xs font-semibold text-ink">
                            {inspectedBest.label}
                          </span>
                        </span>
                        <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-basil" />
                      </button>
                    )}

                    <div className="mt-auto border-t border-line pt-4">
                      <p className="line-clamp-2 text-[11px] leading-5 text-ink-soft">
                        {order.explanation}
                      </p>
                      <button
                        type="button"
                        tabIndex={!showOrderFace ? 0 : -1}
                        onClick={() => setShowOrderFace(true)}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line py-3 text-xs font-bold text-ink transition hover:border-pomodoro hover:text-pomodoro"
                      >
                        <Icon name="arrow-right" className="h-3.5 w-3.5 rotate-180" />
                        注文を確認
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex items-baseline gap-3">
            <p className="font-display text-sm italic tracking-[0.12em] text-pomodoro">
              La tua proposta
            </p>
            <span className="text-xs text-ink-soft">あなたの提案</span>
          </div>

          <div className="mt-5 space-y-7">
            {order.slots.map((slot) => {
              const chosenId = selection[slot.answerType];
              const maxScore = Math.max(...slot.choices.map((choice) => choice.score));

              return (
                <fieldset key={slot.answerType}>
                  <legend className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[0.12em] text-pomodoro">
                      {ANSWER_TYPE_LABEL[slot.answerType]}
                    </span>
                    <span className="text-sm font-bold text-ink">{slot.prompt}</span>
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {slot.choices.map((choice) => {
                      const chosen = chosenId === choice.id;
                      const best = submitted && choice.score === maxScore;
                      const inspecting =
                        submitted &&
                        inspected?.answerType === slot.answerType &&
                        inspected.choiceId === choice.id;
                      const flipped =
                        submitted &&
                        revealedKeys.includes(
                          `${slot.answerType}:${choice.id}`,
                        );
                      let style =
                        "border-line bg-cream hover:border-olive hover:bg-paper";
                      if (submitted) {
                        if (best) style = "border-basil bg-cream";
                        else if (chosen)
                          style = "border-pomodoro bg-cream";
                        else style = "border-line bg-cream hover:border-ink-soft";
                        if (inspecting) style += " ring-2 ring-ink/10";
                      } else if (chosen) {
                        style = "border-pomodoro bg-pomodoro/5";
                      }

                      const backStyle = best
                        ? "bg-basil text-cream"
                        : chosen
                          ? "bg-pomodoro text-cream"
                          : "bg-ink text-cream";

                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => choose(slot.answerType, choice.id)}
                          aria-pressed={
                            submitted ? inspecting : chosen
                          }
                          data-flipped={flipped ? "true" : "false"}
                          className={`choice-flip rounded-2xl border text-left transition duration-200 ${style}`}
                        >
                          <span className="choice-flip-inner block min-h-[78px]">
                            <span className="choice-flip-face flex min-h-[78px] items-center gap-3 p-4">
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                                  best
                                    ? "border-basil bg-basil text-cream"
                                    : chosen
                                      ? "border-pomodoro bg-pomodoro text-cream"
                                      : "border-ink/25 bg-transparent"
                                }`}
                              >
                                {(chosen || best) && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                )}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium leading-5 text-ink">
                                  {choice.label}
                                </span>
                                {submitted && (
                                  <span className="mt-1 block text-[10px] font-medium text-ink-soft">
                                    クリックして評価を見る
                                  </span>
                                )}
                              </span>
                            </span>
                            <span className={`choice-flip-face choice-flip-back flex min-h-[78px] items-center justify-between gap-3 rounded-[0.9rem] px-4 py-3 ${backStyle}`}>
                              <span className="min-w-0">
                                <span className="block text-[10px] font-bold tracking-wide text-cream/85">
                                  {chosen ? "選んだ提案" : best ? "最も自然" : "比較中"}
                                </span>
                                <span className="mt-1 block line-clamp-2 text-xs font-semibold leading-4">
                                  {choice.label}
                                </span>
                              </span>
                              <span className="shrink-0">
                                <span className="font-display text-3xl font-semibold leading-none">
                                  {choice.score}
                                </span>
                                <span className="ml-0.5 text-[10px] font-bold text-cream/85">点</span>
                              </span>
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>

          {!submitted ? (
            <button
              type="button"
              onClick={submit}
              disabled={!allAnswered}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-basil px-5 py-4 text-sm font-bold text-cream shadow-[0_16px_38px_-22px_rgba(50,76,31,0.95)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-basil-deep disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft"
            >
              {allAnswered ? "この提案で決定" : "すべての項目を選んでください"}
              {allAnswered && <Icon name="arrow-right" className="h-4 w-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-ink px-5 py-4 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-pomodoro"
            >
              {index + 1 >= total ? "結果を見る" : "次の注文へ"}
              <Icon name="arrow-right" className="h-4 w-4" />
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

function TopBar({
  stageLabel,
  index,
  total,
  elapsedSeconds,
}: {
  stageLabel: string;
  index: number;
  total: number;
  elapsedSeconds: number;
}) {
  const progress = total ? (index / total) * 100 : 0;
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-3.5 sm:px-8 lg:px-10">
        <Link href="/" className="font-display text-base font-semibold text-ink sm:text-lg">
          Trattoria <i className="text-pomodoro">Hide</i>
          <span className="ml-1 font-sans text-[11px] font-medium tracking-wide text-ink-soft sm:text-xs">
            へようこそ
          </span>
        </Link>
        <div className="flex items-center gap-3 font-display text-sm text-ink-soft">
          <span className="tabular-nums text-pomodoro">{formatTime(elapsedSeconds)}</span>
          <span>{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-3 pt-2 sm:px-8 lg:px-10">
        <Link
          href="/stages"
          className="flex items-center gap-2 text-xs font-medium text-ink-soft transition hover:text-ink"
        >
          <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          {stageLabel}
        </Link>
        <span className="h-px w-20 overflow-hidden bg-line sm:w-28">
          <span className="block h-full bg-pomodoro" style={{ width: `${progress}%` }} />
        </span>
      </div>
    </header>
  );
}
