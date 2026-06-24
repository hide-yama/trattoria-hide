"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import OrderGame from "@/components/OrderGame";
import { ORDERS } from "@/data/orders";
import { getStage, ordersForStage } from "@/lib/stages";
import { useProgress, wrongIds } from "@/lib/progress";

function PlayInner() {
  const params = useSearchParams();
  const stageId = params.get("stage") ?? "all";
  const stage = getStage(stageId);
  const { state, hydrated } = useProgress();

  const orders = useMemo(() => {
    if (stageId === "wrong") {
      const ids = new Set(wrongIds(state, ORDERS.map((o) => o.id)));
      return ORDERS.filter((o) => ids.has(o.id));
    }
    return ordersForStage(stageId);
  }, [stageId, state]);

  if (!stage) {
    return (
      <Notice text="ステージが見つかりませんでした。" />
    );
  }

  // 復習ステージは進捗の読み込み待ち
  if (stageId === "wrong" && !hydrated) {
    return <Notice text="読み込み中…" />;
  }

  if (orders.length === 0) {
    return (
      <Notice
        text={
          stageId === "wrong"
            ? "苦手な注文はありません。よくできています！"
            : "このステージにはまだ問題がありません。"
        }
      />
    );
  }

  return <OrderGame key={stageId} orders={orders} stageLabel={stage.label} />;
}

function Notice({ text }: { text: string }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-paper px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-cream text-basil shadow-sm">
        <Icon name="cloche" className="h-7 w-7" />
      </span>
      <p className="max-w-sm text-sm leading-6 text-ink-soft">{text}</p>
      <Link
        href="/stages"
        className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-pomodoro"
      >
        ステージを選ぶ
        <Icon name="arrow-right" className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function PlayPage() {
  return (
    <main className="min-h-dvh">
      <Suspense fallback={<Notice text="読み込み中…" />}>
        <PlayInner />
      </Suspense>
    </main>
  );
}
