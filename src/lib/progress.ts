"use client";

// 進捗の永続化。今は localStorage、将来は Supabase の user_progress テーブルに置き換える。
// best: 各注文の最高スコア / attempts: 挑戦回数。
// 「正解できた(cleared)」= best >= 60 とする（部分正解以上）。

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "trattoria_progress_v1";
const CLEAR_THRESHOLD = 60;

export interface ProgressState {
  best: Record<string, number>;
  attempts: Record<string, number>;
}

const EMPTY: ProgressState = { best: {}, attempts: {} };

function load(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { best: parsed.best ?? {}, attempts: parsed.attempts ?? {} };
  } catch {
    return EMPTY;
  }
}

function persist(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage が使えない環境では黙って無視
  }
}

export interface ProgressStats {
  answered: number; // 1回でも挑戦した注文数
  cleared: number; // best >= 60 の注文数
  total: number; // 対象の全注文数
  avgBest: number; // 挑戦済み注文の平均最高スコア
}

export function computeStats(
  state: ProgressState,
  allIds: string[],
): ProgressStats {
  const answeredIds = allIds.filter((id) => state.attempts[id] > 0);
  const cleared = allIds.filter(
    (id) => (state.best[id] ?? 0) >= CLEAR_THRESHOLD,
  ).length;
  const avgBest =
    answeredIds.length === 0
      ? 0
      : Math.round(
          answeredIds.reduce((s, id) => s + (state.best[id] ?? 0), 0) /
            answeredIds.length,
        );
  return { answered: answeredIds.length, cleared, total: allIds.length, avgBest };
}

/** 挑戦済みだがまだクリアできていない（best < 60）注文id */
export function wrongIds(state: ProgressState, allIds: string[]): string[] {
  return allIds.filter(
    (id) => state.attempts[id] > 0 && (state.best[id] ?? 0) < CLEAR_THRESHOLD,
  );
}

export function isCleared(state: ProgressState, id: string): boolean {
  return (state.best[id] ?? 0) >= CLEAR_THRESHOLD;
}

/**
 * 進捗フック。SSR/初回ハイドレーション時は EMPTY を返し、
 * マウント後に localStorage から読み込む（hydration mismatch 回避）。
 */
export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(load());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const record = useCallback((orderId: string, score: number) => {
    setState((prev) => {
      const next: ProgressState = {
        best: {
          ...prev.best,
          [orderId]: Math.max(prev.best[orderId] ?? 0, score),
        },
        attempts: {
          ...prev.attempts,
          [orderId]: (prev.attempts[orderId] ?? 0) + 1,
        },
      };
      persist(next);
      return next;
    });
  }, []);

  return { state, record, hydrated };
}

export { CLEAR_THRESHOLD };
