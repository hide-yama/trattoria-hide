// イタリア食文化学習ゲーム - データ型定義
// 要件定義 14章のJSONスキーマをベースに、採点哲学（スロット×選択肢×スコア）を表現。
// 将来 Supabase のテーブル（orders / answer_slots / choices）へそのまま分割できる構造。

/** 難易度 */
export type Difficulty = "beginner" | "intermediate" | "advanced";

/** 回答項目の種類。1問は1つ以上のスロットを持つ（初級=1, 中級=2〜3）。 */
export type AnswerType =
  | "area" // エリア（北/中/南/島）
  | "region" // 州
  | "dishStyle" // 料理様式（ナポリ風ピッツァ など）
  | "dish" // 料理
  | "drink" // 飲み物
  | "reason"; // 提案理由（上級）

/** 回答項目の日本語ラベル（UI表示用） */
export const ANSWER_TYPE_LABEL: Record<AnswerType, string> = {
  area: "エリア",
  region: "州",
  dishStyle: "料理様式",
  dish: "料理",
  drink: "飲み物",
  reason: "理由",
};

/**
 * 選択肢。score は 0〜100。
 * 「絶対正解は1つ」ではなく、自然さの度合いでスコアを持たせる（要件13章）。
 */
export interface Choice {
  id: string;
  label: string;
  /** 0〜100。100=最も自然 / 60前後=方向性は合う / 0〜30=ずれている */
  score: number;
  /** なぜそのスコアなのかを説明する一言フィードバック（要件13-4） */
  feedback: string;
}

/** 回答項目（スロット）。1つの注文に対して問う観点の単位。 */
export interface AnswerSlot {
  answerType: AnswerType;
  /** 「この特徴に近いピッツァ様式は？」のような設問文 */
  prompt: string;
  choices: Choice[];
}

/** 1問（=1注文）。 */
export interface Order {
  id: string;
  difficulty: Difficulty;
  /** 切り口別ステージ用の分類タグ（例: "pizza_style", "pairing"） */
  stageType: string;
  /** お客さんアイコンの暫定表現（絵文字）。後で画像に差し替え。 */
  customerEmoji: string;
  /** お客さんの注文セリフ（特徴ベース） */
  orderText: string;
  /** 検索・苦手分析用タグ */
  tags: string[];
  /** 回答項目。初級は1つ、中級は2〜3。 */
  slots: AnswerSlot[];
  /** 解説（正誤に関わらず表示） */
  explanation: string;
}
