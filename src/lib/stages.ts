// ステージ定義。どの通常ステージも対象プールからランダムに10問出題する。
// 各ステージは ORDERS をどう絞り込むかを持つ。
// 復習(wrong)は進捗データに依存するため、ここでは match を持たず play 側で処理する。

import type { Order } from "./types";
import { ORDERS } from "@/data/orders";

export type StageGroup = "difficulty" | "cut" | "special";

export interface StageDef {
  id: string;
  group: StageGroup;
  label: string;
  emoji: string;
  description: string;
  /** ORDERS からこのステージの問題を選ぶ条件。special は undefined。 */
  match?: (o: Order) => boolean;
}

export const STAGES: StageDef[] = [
  // 難易度別
  {
    id: "beginner",
    group: "difficulty",
    label: "初級",
    emoji: "🌱",
    description: "特徴から、ざっくり選ぶ。1問1項目。",
    match: (o) => o.difficulty === "beginner",
  },
  {
    id: "intermediate",
    group: "difficulty",
    label: "中級",
    emoji: "🍷",
    description: "料理・州・飲み物を組み合わせて選ぶ。",
    match: (o) => o.difficulty === "intermediate",
  },

  // 切り口別
  {
    id: "dish_style",
    group: "cut",
    label: "料理様式",
    emoji: "🍕",
    description: "注文に合う料理・様式を選ぶ。",
    match: (o) => o.stageType === "dish_style",
  },
  {
    id: "drink",
    group: "cut",
    label: "飲み物",
    emoji: "🍺",
    description: "注文に合う飲み物を選ぶ。",
    match: (o) => o.stageType === "drink",
  },
  {
    id: "pairing",
    group: "cut",
    label: "ペアリング",
    emoji: "🍝",
    description: "料理と飲み物の組み合わせを選ぶ。",
    match: (o) => o.stageType === "pairing",
  },
  {
    id: "area",
    group: "cut",
    label: "エリア判定",
    emoji: "🗺️",
    description: "北・中・南・島の大きな地理感をつかむ。",
    match: (o) => o.stageType === "area",
  },
  {
    id: "region",
    group: "cut",
    label: "州判定",
    emoji: "📍",
    description: "特徴から最も自然な州を選ぶ。",
    match: (o) => o.stageType === "region",
  },

  // 特別
  {
    id: "all",
    group: "special",
    label: "おまかせ10問",
    emoji: "🎲",
    description: "すべての注文からランダムに10問。",
    match: () => true,
  },
  {
    id: "wrong",
    group: "special",
    label: "苦手を復習",
    emoji: "🔁",
    description: "まだ正解できていない注文だけ再挑戦。",
    // match は持たない（進捗データに依存）
  },
];

export function getStage(id: string): StageDef | undefined {
  return STAGES.find((s) => s.id === id);
}

/** 通常ステージの問題一覧（special:wrong は除く）。 */
export function ordersForStage(id: string): Order[] {
  const stage = getStage(id);
  if (!stage || !stage.match) return [];
  return ORDERS.filter(stage.match);
}

export const STAGE_GROUP_LABEL: Record<StageGroup, string> = {
  difficulty: "難易度で選ぶ",
  cut: "切り口で選ぶ",
  special: "その他",
};
