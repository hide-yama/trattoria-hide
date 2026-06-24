// 採点ロジック（要件13章）。
// 各スロットで選んだ選択肢のスコアを平均して総合スコアを出す。
// 「完全正解だけにしない」方針なので、部分点・惜しいを判定として持つ。

import type { Order, Choice } from "./types";

/** 判定の段階 */
export type Verdict = "perfect" | "good" | "near" | "off";

export const VERDICT_LABEL: Record<Verdict, string> = {
  perfect: "正解！",
  good: "部分正解",
  near: "惜しい",
  off: "ずれています",
};

/** スロットid（answerType）→ 選んだ選択肢id のマップ */
export type Selection = Record<string, string>;

export interface SlotResult {
  answerType: string;
  prompt: string;
  choice: Choice;
}

export interface GradeResult {
  totalScore: number; // 0〜100
  verdict: Verdict;
  slotResults: SlotResult[];
  /** 各スロットの最良選択肢（おすすめ回答の提示用） */
  bestChoices: SlotResult[];
}

function verdictOf(score: number): Verdict {
  if (score >= 90) return "perfect";
  if (score >= 60) return "good";
  if (score >= 40) return "near";
  return "off";
}

/** 注文とユーザーの選択から採点する */
export function grade(order: Order, selection: Selection): GradeResult {
  const slotResults: SlotResult[] = [];
  const bestChoices: SlotResult[] = [];

  for (const slot of order.slots) {
    const chosenId = selection[slot.answerType];
    const choice =
      slot.choices.find((c) => c.id === chosenId) ?? slot.choices[0];
    slotResults.push({
      answerType: slot.answerType,
      prompt: slot.prompt,
      choice,
    });

    const best = slot.choices.reduce((a, b) => (b.score > a.score ? b : a));
    bestChoices.push({
      answerType: slot.answerType,
      prompt: slot.prompt,
      choice: best,
    });
  }

  const totalScore = Math.round(
    slotResults.reduce((sum, r) => sum + r.choice.score, 0) /
      slotResults.length,
  );

  return {
    totalScore,
    verdict: verdictOf(totalScore),
    slotResults,
    bestChoices,
  };
}
