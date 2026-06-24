import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ORDERS } from "@/data/orders";
import { ANSWER_TYPE_LABEL, LEARNING_FOCUS_LABEL } from "@/lib/types";
import { googleImageSearchUrl } from "@/lib/image-search";

const GROUPS = [
  { id: "dish_style", label: "料理様式", sub: "Stile" },
  { id: "drink", label: "飲み物", sub: "Bevande" },
  { id: "pairing", label: "ペアリング", sub: "Abbinamenti" },
  { id: "area", label: "エリア", sub: "Aree" },
  { id: "region", label: "州・郷土料理", sub: "Regioni" },
] as const;

export default function AnswersPage() {
  return (
    <main className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/94 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="font-display text-lg font-semibold text-ink">
            Trattoria <i className="text-pomodoro">Hide</i>
            <span className="ml-1 font-sans text-xs font-medium text-ink-soft">へようこそ</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-medium text-ink-soft hover:text-ink">
            ホームへ
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="font-display text-sm italic tracking-[0.14em] text-pomodoro">Risposte</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">答え集</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
          すべての注文と、最も自然な提案をジャンル別に掲載しています。詳しい比較はタイムアタックの解説で確認できます。
        </p>

        <nav className="mt-8 flex flex-wrap gap-2" aria-label="ジャンル">
          {GROUPS.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="rounded-full border border-line bg-cream px-4 py-2 text-xs font-bold text-ink transition hover:border-basil hover:text-basil">
              {group.label}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {GROUPS.map((group) => {
            const orders = ORDERS.filter((order) => order.stageType === group.id);
            return (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3">
                  <div className="flex items-baseline gap-3">
                    <h2 className="text-xl font-bold text-ink">{group.label}</h2>
                    <span className="font-display text-xs italic text-pomodoro">{group.sub}</span>
                  </div>
                  <span className="text-xs tabular-nums text-ink-soft">{orders.length}問</span>
                </div>

                <ol className="divide-y divide-line">
                  {orders.map((order, orderIndex) => (
                    <li key={order.id} className="grid gap-4 py-6 sm:grid-cols-[2.5rem_1fr]">
                      <span className="font-display text-sm text-pomodoro">{String(orderIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="mb-2 text-[10px] font-bold tracking-[0.1em] text-pomodoro">
                          {LEARNING_FOCUS_LABEL[order.learningFocus]}
                        </p>
                        <p className="text-sm leading-7 text-ink">{order.orderText}</p>
                        <dl className="mt-3 space-y-2 border-l-2 border-basil/25 pl-4">
                          {order.slots.map((slot) => {
                            const best = slot.choices.reduce((current, choice) => choice.score > current.score ? choice : current);
                            return (
                              <div key={slot.answerType} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3">
                                <dt className="text-[10px] font-bold tracking-[0.12em] text-ink-soft">{ANSWER_TYPE_LABEL[slot.answerType]}</dt>
                                <dd className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm font-bold text-basil">
                                  <span>{best.label}</span>
                                  <a
                                    href={googleImageSearchUrl(best.label)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-ink-soft underline decoration-ink-soft/25 underline-offset-4 transition hover:text-pomodoro"
                                  >
                                    画像で見る
                                    <Icon name="arrow-right" className="h-3 w-3 -rotate-45" />
                                  </a>
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                        {order.knowledge && (
                          <p className="mt-3 text-[11px] leading-5 text-ink-soft">
                            {[order.knowledge.region, order.knowledge.denomination, order.knowledge.grapes?.join("・")]
                              .filter(Boolean)
                              .join(" ／ ")}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
