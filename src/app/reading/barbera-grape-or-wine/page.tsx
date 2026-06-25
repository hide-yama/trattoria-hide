import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "「バルベーラをください」と言われたら？ | 読み物の部屋",
  description: "バルベーラは品種名。それでも一本を決められない理由を、呼称、産地、造り方、料理から考えます。",
};

const LABELS = [
  {
    name: "バルベーラ・ダスティ DOCG",
    point: "アスティとモンフェッラートを中心とする呼称",
    text: "バルベーラを90%以上用います。ステンレスタンクでフレッシュに仕上げる方向も、木樽を使って複雑さを求める方向もあります。名前だけで軽いと決めつけないことが重要です。",
  },
  {
    name: "バルベーラ・ダスティ・スペリオーレ DOCG",
    point: "熟成と厚みを意識したタイプ",
    text: "通常のバルベーラ・ダスティより長い熟成が必要で、木樽での期間も含まれます。肉料理や熟成チーズへ提案の幅が広がります。",
  },
  {
    name: "バルベーラ・ダルバ DOC",
    point: "アルバ周辺の丘陵に結びつく別の呼称",
    text: "同じバルベーラを軸にしていても、バルベーラ・ダスティとは保護される産地と規定が異なります。「ダスティ」と「ダルバ」は飾りではありません。",
  },
  {
    name: "ニッツァ DOCG",
    point: "バルベーラの独立した呼称",
    text: "かつてバルベーラ・ダスティの下位区分だった地域が、独立したDOCGになりました。品種名を前面に出さないラベルでも、知識があればバルベーラとの関係を読めます。",
  },
];

export default function BarberaArticlePage() {
  return (
    <main className="min-h-dvh bg-paper">
      <header className="border-b border-ink/10 bg-paper/94 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/reading" className="font-display text-lg font-semibold text-ink">
            Sala di <i className="text-pomodoro">lettura</i>
          </Link>
          <Link href="/reading" className="flex items-center gap-2 text-xs font-medium text-ink-soft transition hover:text-ink">
            読み物の部屋
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </header>

      <article>
        <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1.12fr_0.88fr] md:items-center">
          <div>
            <div className="flex items-center gap-3 text-pomodoro">
              <span className="font-display text-sm italic">Caso 02</span>
              <span className="h-px w-8 bg-current/40" />
              <span className="text-[10px] font-bold tracking-[0.12em]">名前を読み解く</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.25] tracking-[-0.04em] text-ink sm:text-5xl">
              「バルベーラをください」
              <br />
              と言われたら、
              <br />
              何を確認する？
            </h1>
            <p className="mt-5 text-sm leading-7 text-ink-soft">
              バルベーラは品種名です。しかし、品種が分かっただけでは一本を選べません。呼称と造り方まで、注文の続きを聞きます。
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-line">
            <Image src="/images/stages/intermediate.webp" alt="赤ワインとテイスティングノート" fill priority sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-right" />
          </div>
        </section>

        <div className="border-y border-ink/10 bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
            <p className="text-[10px] font-bold tracking-[0.14em] text-pomodoro">ORDINAZIONE</p>
            <blockquote className="mt-4 text-lg font-bold leading-8 text-ink sm:text-xl">
              「前に飲んだバルベーラがおいしかったので、同じようなものをお願いします。名前が同じなら、味もだいたい同じですよね？」
            </blockquote>
          </div>
        </div>

        <div className="reading-article mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <section>
            <Eyebrow number="01" text="先に答える" />
            <h2>バルベーラは品種名。でも、それだけでは注文が完成しない。</h2>
            <p>
              「バルベーラ」はブドウ品種の名前です。一方、「バルベーラ・ダスティ」は、その品種を軸にアスティとアレッサンドリアの定められた地域・規定で造るワインの呼称です。
            </p>
            <p>
              ここで「ではバルベーラ・ダスティを」とすぐ決めるのはまだ早い。お客様が以前飲んだのは、若くフレッシュなタイプかもしれませんし、木樽で熟成したスペリオーレかもしれません。同じ品種、同じ呼称でも、造り方で体験は変わります。
            </p>
          </section>

          <section>
            <Eyebrow number="02" text="何を聞き返す？" />
            <h2>銘柄を知らなくても、三つ聞けば近づける。</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Question title="軽かった？" text="みずみずしく、気軽に飲めたのか。樽や熟成の厚みがあったのか。" />
              <Question title="何と飲んだ？" text="パスタ、肉、チーズ。料理はワインの印象を思い出す手掛かりになる。" />
              <Question title="ラベルは残っている？" text="写真があれば、呼称、造り手、ヴィンテージまで一度に確認できる。" />
            </div>
            <p>
              接客で大切なのは、お客様の記憶を試験することではありません。「どんな味でしたか」と抽象的に聞くより、軽さ、料理、ラベル写真という答えやすい入口を作ります。
            </p>
          </section>

          <aside className="my-12 rounded-[1.5rem] border border-olive/30 bg-[linear-gradient(135deg,rgba(179,144,47,0.1),rgba(255,255,255,0.75))] p-6 sm:p-8">
            <p className="font-display text-sm italic text-pomodoro">Una domanda</p>
            <h2 className="mt-2 text-xl font-bold text-ink">品種名が同じなら、味も似るのでは？</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              品種は味の方向を決める重要な要素ですが、完成した味を一つに固定する設計図ではありません。育った土地、収穫時期、果実の熟し方、発酵、抽出、樽、熟成期間で表情は変わります。
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              つまり品種は「答え」ではなく「最初の絞り込み」です。この理解ができると、サンジョヴェーゼからキャンティもブルネッロも生まれる理由へ、疑問が自然につながります。
            </p>
          </aside>

          <section>
            <Eyebrow number="03" text="ラベルを分解する" />
            <h2>同じバルベーラでも、名前が変わる。</h2>
            <div className="mt-6 space-y-3">
              {LABELS.map((item, index) => (
                <div key={item.name} className={`rounded-2xl border p-5 sm:p-6 ${index === 0 ? "border-basil bg-basil/5" : "border-line bg-cream"}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">{item.name}</h3>
                    <span className="text-[10px] font-bold tracking-wide text-basil">{item.point}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Eyebrow number="04" text="一本を提案する" />
            <h2>「同じようなもの」を、条件に翻訳する。</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              <Variation question="軽快で、トマト系パスタと飲んだ" answer="まず通常タイプのバルベーラ・ダスティを検討します。フレッシュさを生かす造りか、樽の影響が強くないかも確認します。" />
              <Variation question="牛肉や熟成チーズと飲み、香ばしさがあった" answer="バルベーラ・ダスティ・スペリオーレを候補へ。熟成と木樽による複雑さが、記憶に近い可能性があります。" />
              <Variation question="濃さより、土地の違いを楽しみたい" answer="ダスティとダルバを飲み比べる提案ができます。優劣ではなく、同じ品種を異なる土地と造り手がどう表現するかを楽しみます。" />
              <Variation question="品種は知らないが、ニッツァという名前だった" answer="ニッツァは独立した呼称ですが、中心にある品種はバルベーラです。ラベルに品種名が大きく見えなくても関係を説明できます。" />
            </div>
          </section>

          <section>
            <Eyebrow number="05" text="接客の言葉にする" />
            <h2>訂正するのではなく、注文を一緒に完成させる。</h2>
            <div className="mt-6 rounded-[1.5rem] bg-basil p-6 text-cream sm:p-8">
              <p className="font-display text-4xl leading-none text-olive">“</p>
              <p className="mt-3 text-base font-bold leading-8">
                バルベーラがお好みなのですね。同じ品種でも、フレッシュなタイプと樽で厚みを出したタイプがあります。前回は軽やかな印象でしたか、それとも香ばしくしっかりした印象でしたか？
              </p>
            </div>
            <p>
              「バルベーラは品種名ですよ」と訂正から入ると、知識は示せても接客にはなりません。お客様の記憶を尊重しながら、提案に必要な分だけ違いを説明します。
            </p>
          </section>

          <section>
            <Eyebrow number="06" text="30秒で説明する" />
            <h2>品種・呼称・タイプを分けて話す。</h2>
            <p>
              バルベーラはブドウ品種です。バルベーラ・ダスティやバルベーラ・ダルバは、その品種と土地を結びつけた別々の呼称です。さらに同じバルベーラ・ダスティにも、フレッシュな通常タイプと、熟成や木樽で厚みを出すスペリオーレがあります。だから、品種名だけでなく、どこで造られ、どんなタイプだったかまで確認すると、以前の好みに近い一本を提案できます。
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-cream p-6 sm:p-8">
            <p className="font-display text-sm italic text-pomodoro">La prossima domanda</p>
            <h2 className="mt-2">では、DOCGなら必ず上のワイン？</h2>
            <p>
              DOCGは産地と生産規定に基づく呼称です。しかし、お客様の好みや料理に対する「絶対的な上位」を示すものではありません。次は、格付けを品質ランキングとして読んでよいのかを考えます。
            </p>
            <Link href="/reading/docg-best-choice" className="mt-5 inline-flex items-center gap-2 rounded-full bg-basil px-4 py-2.5 text-xs font-bold text-cream transition hover:bg-pomodoro">
              次の記事へ
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </section>

          <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-8">
            <Link href="/reading/tomato-pasta-red-wine" className="flex items-center gap-2 text-xs font-bold text-ink-soft transition hover:text-pomodoro">
              <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
              前の記事
            </Link>
            <Link href="/reading" className="text-xs font-bold text-ink-soft transition hover:text-pomodoro">記事一覧へ</Link>
          </nav>

          <footer className="mt-10 border-t border-ink/10 pt-8">
            <p className="text-[10px] font-bold tracking-[0.12em] text-ink-soft">参考資料</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-ink-soft">
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.viniastimonferrato.it/en/denominazioni/barbera-asti-docg/" target="_blank" rel="noreferrer">Consorzio Barbera d’Asti e Vini del Monferrato — Barbera d’Asti DOCG</a></li>
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.langhevini.it/le-denominazioni-tutelate-dal-consorzio/barbera-dalba-doc/" target="_blank" rel="noreferrer">Consorzio di Tutela Barolo Barbaresco Alba Langhe e Dogliani — Barbera d’Alba DOC</a></li>
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.regione.piemonte.it/web/temi/agricoltura/viticoltura-enologia/vini-denominazione-origine-docg-doc" target="_blank" rel="noreferrer">Regione Piemonte — Vini a denominazione di origine</a></li>
            </ul>
          </footer>
        </div>
      </article>
    </main>
  );
}

function Eyebrow({ number, text }: { number: string; text: string }) {
  return <p className="reading-eyebrow"><span>{number}</span>{text}</p>;
}

function Question({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-line bg-cream p-5"><h3 className="text-sm font-bold text-ink">{title}</h3><p className="mt-2 text-xs leading-6 text-ink-soft">{text}</p></div>;
}

function Variation({ question, answer }: { question: string; answer: string }) {
  return <div className="py-5"><h3 className="text-sm font-bold leading-6 text-ink">{question}</h3><p className="mt-2 text-sm leading-7 text-ink-soft">{answer}</p></div>;
}
