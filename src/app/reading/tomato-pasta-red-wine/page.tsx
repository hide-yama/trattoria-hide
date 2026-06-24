import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "トマト系パスタに、渋すぎない赤を頼まれたら？ | 読み物の部屋",
  description: "注文の言葉から条件を読み取り、バルベーラ、キャンティ、ヴァルポリチェッラ、プリミティーヴォを比較して提案を組み立てます。",
};

const CANDIDATES = [
  {
    name: "バルベーラ・ダスティ",
    fit: "今回の第一提案",
    tone: "border-basil bg-basil/5",
    body: "酸が料理の流れを保ちやすく、典型的にはネッビオーロほど強いタンニンを前面に出しません。気取らないトマト系パスタという場面に置きやすい一本です。",
  },
  {
    name: "キャンティ",
    fit: "肉や焼き目が加わるなら",
    tone: "border-line bg-cream",
    body: "サンジョヴェーゼを主要品種とし、赤い果実、酸、やや引き締まるタンニンを持つ方向です。挽肉や炭火の香ばしさが加わると、提案の優先順位が上がります。",
  },
  {
    name: "ヴァルポリチェッラ",
    fit: "もっと軽快にしたいなら",
    tone: "border-line bg-cream",
    body: "若いタイプはフレッシュで生き生きとした飲み口。軽いプリモや白身肉にも合わせやすく、量を重く感じさせたくない昼の食事なら有力です。",
  },
  {
    name: "プリミティーヴォ・ディ・マンドゥーリア",
    fit: "甘みと厚みがある料理なら",
    tone: "border-line bg-cream",
    body: "プリミティーヴォを軸にする南部の赤。熟した印象と厚みを生かしたい場面に向きますが、軽さを求める今回の注文では優先順位が下がります。",
  },
];

export default function ArticlePage() {
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
              <span className="font-display text-sm italic">Caso 01</span>
              <span className="h-px w-8 bg-current/40" />
              <span className="text-[10px] font-bold tracking-[0.12em]">ワインの提案</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.25] tracking-[-0.04em] text-ink sm:text-5xl">
              「トマト系のパスタに、
              <br />
              渋すぎない赤を」
              <br />
              と言われたら？
            </h1>
            <p className="mt-5 text-sm leading-7 text-ink-soft">
              ワイン名を一つ思い出すのではなく、注文に含まれる条件を分け、候補同士の差から提案を組み立てます。
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-line">
            <Image src="/images/stages/drink.webp" alt="赤ワインのグラスとボトル" fill priority sizes="(max-width: 768px) 100vw, 400px" className="object-cover object-right" />
          </div>
        </section>

        <div className="border-y border-ink/10 bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
            <p className="text-[10px] font-bold tracking-[0.14em] text-pomodoro">ORDINAZIONE</p>
            <blockquote className="mt-4 text-lg font-bold leading-8 text-ink sm:text-xl">
              「トマトを使った気取らないパスタに、赤を一杯。渋すぎず、酸味が料理を重くしない、果実味のあるものがいいです」
            </blockquote>
          </div>
        </div>

        <div className="reading-article mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <section>
            <Eyebrow number="01" text="まず、何を提案する？" />
            <h2>最初の一本は、バルベーラ・ダスティ。</h2>
            <p>
              今回の条件なら、まずバルベーラ・ダスティを提案します。決め手は「トマト」「気取らない」「渋すぎない」「料理を重くしない」の四つです。
            </p>
            <p>
              ただし、これはバルベーラが常にトマト料理の正解という意味ではありません。肉の量、焼き目、ソースの甘み、食事の時間帯が変われば、別の候補が前に出ます。提案とは銘柄当てではなく、条件の優先順位を決める作業です。
            </p>
          </section>

          <section>
            <Eyebrow number="02" text="注文のどこを読む？" />
            <h2>味の単語より、組み合わせを見る。</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Signal title="トマト" text="料理側にも酸がある。ワインにも生き生きした酸があると、全体の調子を揃えやすい。" />
              <Signal title="気取らないパスタ" text="長期熟成の威厳より、料理と会話を邪魔しない親しみやすさを優先する。" />
              <Signal title="渋すぎない" text="強いタンニンを避けたいという明確な制約。果実味だけを見てはいけない。" />
              <Signal title="重くしない" text="高い度数、樽の強さ、濃縮感を足しすぎない。飲み進めやすさも提案条件になる。" />
            </div>
          </section>

          <aside className="my-12 rounded-[1.5rem] border border-olive/30 bg-[linear-gradient(135deg,rgba(179,144,47,0.1),rgba(255,255,255,0.75))] p-6 sm:p-8">
            <p className="font-display text-sm italic text-pomodoro">Una domanda</p>
            <h2 className="mt-2 text-xl font-bold text-ink">酸っぱい料理に、酸のあるワインを合わせて大丈夫？</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              「酸には甘いものをぶつける」と考えたくなりますが、食事では単純ではありません。トマトに対して酸の乏しいワインを合わせると、ワインが平板で鈍く感じられることがあります。料理とワインの酸の調子を揃えると、どちらか一方だけが突出しにくくなります。
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              ただし、ソースに砂糖が多い、チーズや肉の脂が多い、といった条件が加われば判断は変わります。ここから「料理の一要素だけでワインを決めてはいけない」という次の原則が見えてきます。
            </p>
          </aside>

          <section>
            <Eyebrow number="03" text="候補を比較する" />
            <h2>不正解ではなく、条件の違う提案。</h2>
            <p>
              四本はすべてイタリアの食卓に置ける赤です。違うのは、どの条件を強く満たすかです。
            </p>
            <div className="mt-6 space-y-3">
              {CANDIDATES.map((candidate) => (
                <div key={candidate.name} className={`rounded-2xl border p-5 sm:p-6 ${candidate.tone}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-ink">{candidate.name}</h3>
                    <span className="text-[10px] font-bold tracking-wide text-basil">{candidate.fit}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{candidate.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Eyebrow number="04" text="条件を一つ変える" />
            <h2>注文が変われば、提案も変わる。</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              <Variation question="挽肉のラグーや炭火の香りが加わったら？" answer="キャンティを前へ。酸に加えて、タンニンと香ばしいニュアンスを受け止める料理側の強さが生まれます。" />
              <Variation question="昼に軽く一皿だけ食べるなら？" answer="若いヴァルポリチェッラが有力。フレッシュさと軽快さを優先できます。" />
              <Variation question="豚肉の甘辛い煮込みソースなら？" answer="プリミティーヴォを検討。料理側の甘みと厚みに、熟した果実味を重ねる余地ができます。" />
              <Variation question="渋みは本当に苦手。でも赤がいいなら？" answer="銘柄だけで決めず、若い造り、樽の強さ、提供温度まで確認します。同じ呼称でも造り手による差があります。" />
            </div>
          </section>

          <section>
            <Eyebrow number="05" text="接客の言葉にする" />
            <h2>知識を並べず、選んだ理由を伝える。</h2>
            <div className="mt-6 rounded-[1.5rem] bg-basil p-6 text-cream sm:p-8">
              <p className="font-display text-4xl leading-none text-olive">“</p>
              <p className="mt-3 text-base font-bold leading-8">
                トマトの酸味に寄り添う、ピエモンテのバルベーラはいかがでしょう。果実味はありますが渋みが強すぎず、気軽なパスタを重くしにくい赤です。
              </p>
            </div>
            <p>
              お客様が必要としているのは、品種の講義ではありません。「あなたの希望をこう読み、そのためにこれを選びました」という短い橋渡しです。詳しい話は、興味を示されたら一段ずつ足します。
            </p>
          </section>

          <section>
            <Eyebrow number="06" text="30秒で説明する" />
            <h2>人に話せる形で覚える。</h2>
            <p>
              バルベーラはピエモンテを代表する黒ブドウ品種の一つで、バルベーラ・ダスティはその品種を軸にした呼称です。酸を感じやすく、料理を重くしにくい赤として提案しやすい一方、造り方によっては樽や熟成による厚みも出ます。だから「バルベーラなら必ず軽い」と決めつけず、注文の場面とスタイルまで見ます。
            </p>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-cream p-6 sm:p-8">
            <p className="font-display text-sm italic text-pomodoro">La prossima domanda</p>
            <h2 className="mt-2">では、バルベーラは品種名？ ワイン名？</h2>
            <p>
              答えは「品種名」です。ただし、バルベーラ・ダスティのように呼称の一部にも現れます。ここから、イタリアワインで品種名・地名・呼称がどうラベルに現れるのか、次の疑問が始まります。
            </p>
            <Link href="/reading/barbera-grape-or-wine" className="mt-5 inline-flex items-center gap-2 rounded-full bg-basil px-4 py-2.5 text-xs font-bold text-cream transition hover:bg-pomodoro">
              次の記事へ
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </section>

          <footer className="mt-14 border-t border-ink/10 pt-8">
            <p className="text-[10px] font-bold tracking-[0.12em] text-ink-soft">参考資料</p>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-ink-soft">
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.viniastimonferrato.it/denominazioni/barbera-asti-docg/" target="_blank" rel="noreferrer">Consorzio Barbera d’Asti e Vini del Monferrato — Barbera d’Asti DOCG</a></li>
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.consorziovinochianti.it/chianti-identikit/?lang=en" target="_blank" rel="noreferrer">Consorzio Vino Chianti — Chianti identikit</a></li>
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.consorziovalpolicella.it/en/types-of-wines/vino-valpolicella-doc/" target="_blank" rel="noreferrer">Consorzio Tutela Vini Valpolicella — Valpolicella DOC</a></li>
              <li><a className="underline underline-offset-4 hover:text-pomodoro" href="https://www.regione.puglia.it/web/produzioni-di-qualita/-/primitivo-di-manduria" target="_blank" rel="noreferrer">Regione Puglia — Primitivo di Manduria DOP</a></li>
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

function Signal({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-line bg-cream p-5"><h3 className="text-sm font-bold text-ink">{title}</h3><p className="mt-2 text-xs leading-6 text-ink-soft">{text}</p></div>;
}

function Variation({ question, answer }: { question: string; answer: string }) {
  return <div className="py-5"><h3 className="text-sm font-bold leading-6 text-ink">{question}</h3><p className="mt-2 text-sm leading-7 text-ink-soft">{answer}</p></div>;
}
