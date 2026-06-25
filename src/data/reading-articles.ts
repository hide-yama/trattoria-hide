export type ReadingArticle = {
  slug: string;
  caseNumber: string;
  label: string;
  title: string;
  shortTitle: string;
  description: string;
  readTime: string;
  order: string;
  heroImage: string;
  heroAlt: string;
  intro: string;
  primaryTakeaway: string;
  sections: ArticleSection[];
  next?: {
    title: string;
    text: string;
    href?: string;
  };
  previousHref?: string;
  sources: {
    label: string;
    href: string;
  }[];
};

export type ArticleSection =
  | {
      kind: "text";
      number: string;
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    }
  | {
      kind: "cards";
      number: string;
      eyebrow: string;
      heading: string;
      intro?: string;
      cards: {
        title: string;
        badge: string;
        text: string;
        emphasized?: boolean;
      }[];
    }
  | {
      kind: "variations";
      number: string;
      eyebrow: string;
      heading: string;
      rows: {
        question: string;
        answer: string;
      }[];
    }
  | {
      kind: "note";
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    }
  | {
      kind: "quote";
      number: string;
      eyebrow: string;
      heading: string;
      quote: string;
      paragraph: string;
    };

export const READING_INDEX = [
  {
    slug: "tomato-pasta-red-wine",
    caseNumber: "01",
    label: "ワインの提案",
    title: "「トマト系のパスタに、渋すぎない赤を」と言われたら？",
    description: "注文の条件を読み、赤ワイン候補の優先順位を組み立てる。",
    readTime: "8分",
    image: "/images/stages/drink.webp",
    href: "/reading/tomato-pasta-red-wine",
  },
  {
    slug: "barbera-grape-or-wine",
    caseNumber: "02",
    label: "名前を読み解く",
    title: "「バルベーラをください」と言われたら、何を確認する？",
    description: "品種名・呼称・造り方を分け、同じような一本を具体化する。",
    readTime: "9分",
    image: "/images/stages/intermediate.webp",
    href: "/reading/barbera-grape-or-wine",
  },
  {
    slug: "docg-best-choice",
    caseNumber: "03",
    label: "格付けを読む",
    title: "「DOCGなら間違いないですよね？」と言われたら？",
    description: "格付けを品質ランキングとして扱わず、提案条件へ戻す。",
    readTime: "8分",
    image: "/images/stages/region.webp",
    href: "/reading/docg-best-choice",
  },
  {
    slug: "chianti-vs-chianti-classico",
    caseNumber: "04",
    label: "呼称の違い",
    title: "「キャンティなら何でも同じ？」と聞かれたら？",
    description: "キャンティとキャンティ・クラシコを、上下ではなく別の呼称として理解する。",
    readTime: "9分",
    image: "/images/stages/area.webp",
    href: "/reading/chianti-vs-chianti-classico",
  },
  {
    slug: "sangiovese-many-names",
    caseNumber: "05",
    label: "品種と土地",
    title: "「サンジョヴェーゼが好き」と言われたら、どこまで絞る？",
    description: "同じ品種が、土地と呼称で別のワイン体験になる理由を読む。",
    readTime: "10分",
    image: "/images/stages/pairing.webp",
    href: "/reading/sangiovese-many-names",
  },
  {
    slug: "acid-vs-tannin",
    caseNumber: "06",
    label: "味わいの言語化",
    title: "「酸味は苦手、でも渋すぎない赤がいい」と言われたら？",
    description: "酸味・タンニン・果実味を混同せず、注文を翻訳する。",
    readTime: "8分",
    image: "/images/themes/wine.webp",
    href: "/reading/acid-vs-tannin",
  },
  {
    slug: "valpolicella-ripasso-amarone",
    caseNumber: "07",
    label: "造り方の差",
    title: "「ヴァルポリチェッラとアマローネは同じ土地の赤？」と聞かれたら？",
    description: "同じ土地・近い品種でも、造り方で軽快さと重厚さが分かれる。",
    readTime: "10分",
    image: "/images/stages/intermediate.webp",
    href: "/reading/valpolicella-ripasso-amarone",
  },
  {
    slug: "seafood-white-wine",
    caseNumber: "08",
    label: "魚介と白",
    title: "「魚介には白なら何でもいい？」と言われたら？",
    description: "白ワインを一括りにせず、塩味・香り・油・重さで選ぶ。",
    readTime: "9分",
    image: "/images/stages/dish-style.webp",
    href: "/reading/seafood-white-wine",
  },
] as const;

export const readingArticles: ReadingArticle[] = [
  {
    slug: "docg-best-choice",
    caseNumber: "03",
    label: "格付けを読む",
    title: "「DOCGなら間違いないですよね？」と言われたら？",
    shortTitle: "DOCGなら間違いない？",
    description: "DOCGを品質ランキングとして扱わず、料理・好み・場面に戻して提案するための記事。",
    readTime: "8分",
    order: "「せっかくなので格付けの高いワインをお願いします。DOCGなら、料理にも好みにも間違いないですよね？」",
    heroImage: "/images/stages/region.webp",
    heroAlt: "イタリアの地図とワイングラスを思わせるテーブル",
    intro: "格付けは提案の入口になります。しかし、お客様が求めているのは制度の説明ではなく、今日の料理と気分に合う一本です。",
    primaryTakeaway: "DOCGは「管理された原産地呼称」であって、「すべての場面で上位互換」という意味ではありません。",
    previousHref: "/reading/barbera-grape-or-wine",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "DOCGは安心材料。ただし、提案の答えではない。",
        paragraphs: [
          "DOCGやDOCは、定められた地域・品種・造り方などの規定に沿っていることを示す呼称です。だから、ラベルを読むうえでは非常に重要です。",
          "ただし、お客様の言う「間違いない」は別の意味です。軽い前菜に合うのか、トマトソースに合うのか、渋みが苦手でも飲めるのか。ここは格付けだけでは決まりません。",
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "格付けが高いなら、味も上品で合わせやすいのでは？",
        paragraphs: [
          "ここでの落とし穴は、「制度上の厳密さ」と「今日の注文への適合」を同じものとして扱うことです。長く熟成できる重厚なDOCGが、軽い昼食に最適とは限りません。",
          "逆にDOCやIGTのワインでも、料理や予算、飲む速度に合えば、その日の提案としては十分に強い選択になります。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "比べて考える",
        heading: "呼称は、優劣より先に性格を読む。",
        intro: "四つの候補を、上下ではなく「何に向いた制度・スタイルか」で見ます。",
        cards: [
          {
            title: "バルベーラ・ダスティ DOCG",
            badge: "品種と地域が見える",
            text: "酸を生かす軽快な方向も、スペリオーレのように厚みを出す方向もあります。DOCGだから重い、とは読めません。",
            emphasized: true,
          },
          {
            title: "キャンティ・クラシコ DOCG",
            badge: "歴史的地域の呼称",
            text: "キャンティの高級版というより、独立した呼称として読むべきワインです。料理との相性は熟成区分や造りにも左右されます。",
          },
          {
            title: "ヴァルポリチェッラ DOC",
            badge: "軽快な赤も強い候補",
            text: "DOCでも、若いタイプの軽さは食事に置きやすい強みになります。格付けの文字だけで候補から外すのは雑です。",
          },
          {
            title: "IGTの赤",
            badge: "自由度の高い設計",
            text: "規定の枠から外れることで、造り手が自由なブレンドや表現を選ぶことがあります。制度だけで品質を決めつけません。",
          },
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "注文に戻す",
        heading: "格付けではなく、目的を聞き返す。",
        rows: [
          {
            question: "記念日で、ゆっくり飲みたい",
            answer: "DOCGやリゼルヴァなど、背景を語れるワインが価値になります。ただし料理の重さも一緒に確認します。",
          },
          {
            question: "前菜から軽く飲みたい",
            answer: "格付けの高さより、アルコール感・樽・タンニンが強すぎないことを優先します。",
          },
          {
            question: "地名を覚えたい",
            answer: "DOCGを学習の目印にするのは有効です。制度を入口に、品種と土地へ進めます。",
          },
          {
            question: "予算を抑えたい",
            answer: "DOCGにこだわらず、DOCやIGTまで広げると、料理に合う現実的な候補が増えます。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "制度を否定せず、用途へ戻す。",
        quote: "DOCGは産地や造りの規定がしっかりした目印です。ただ、今日のお料理に一番合うかは別なので、軽めか、しっかりめかを先に合わせて選びましょう。",
        paragraph: "お客様の言葉を論破しないことが重要です。「DOCGだから良い」という気持ちを受け止め、そのうえで提案の基準を料理と好みに戻します。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "DOCGは地図とルール。相性は別に判断する。",
        paragraphs: [
          "DOCGは、産地や造り方を一定のルールで管理する呼称です。信頼できる目印ですが、料理との相性やお客様の好みまで保証するものではありません。だから提案では、まず格付けを読んだうえで、料理の重さ、酸、渋み、予算、飲む場面に戻して一本を選びます。",
        ],
      },
    ],
    next: {
      title: "では、キャンティとキャンティ・クラシコは同じ？",
      text: "どちらもサンジョヴェーゼを軸にしますが、同じ棚に置いてよいとは限りません。次は、似た名前の呼称をどう読み分けるかを扱います。",
      href: "/reading/chianti-vs-chianti-classico",
    },
    sources: [
      {
        label: "Regione Piemonte — Vini a denominazione di origine",
        href: "https://www.regione.piemonte.it/web/temi/agricoltura/viticoltura-enologia/vini-denominazione-origine-docg-doc",
      },
      {
        label: "Consorzio Barbera d’Asti e Vini del Monferrato — Barbera d’Asti DOCG",
        href: "https://www.viniastimonferrato.it/en/denominazioni/barbera-asti-docg/",
      },
      {
        label: "Consorzio Tutela Vini Valpolicella — Valpolicella DOC",
        href: "https://www.consorziovalpolicella.it/en/types-of-wines/vino-valpolicella-doc/",
      },
    ],
  },
  {
    slug: "chianti-vs-chianti-classico",
    caseNumber: "04",
    label: "呼称の違い",
    title: "「キャンティなら何でも同じ？」と聞かれたら？",
    shortTitle: "キャンティとクラシコ",
    description: "キャンティとキャンティ・クラシコを、上下ではなく別の呼称として説明する記事。",
    readTime: "9分",
    order: "「キャンティが好きです。メニューにキャンティ・クラシコもありますが、これはキャンティのちょっと高い版ですか？」",
    heroImage: "/images/stages/area.webp",
    heroAlt: "丘陵地のぶどう畑を思わせる食卓",
    intro: "名前が似ているワインほど、接客では説明が荒くなりがちです。ここでは『高い版』ではなく『別の呼称』として整理します。",
    primaryTakeaway: "キャンティ・クラシコは、キャンティの単なる上位版ではなく、歴史的な地域と独自規定を持つDOCGです。",
    previousHref: "/reading/docg-best-choice",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "似ている名前でも、同じ箱に入れない。",
        paragraphs: [
          "キャンティもキャンティ・クラシコも、サンジョヴェーゼを中心にしたトスカーナの赤として理解できます。ただし、キャンティ・クラシコは1996年に独立したDOCGとして認められた呼称です。",
          "したがって『キャンティの高級版』とだけ説明すると、地理と制度の大事な違いが消えます。提案では、地域・規定・熟成区分・料理との相性を分けて話します。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "ラベルを読む",
        heading: "同じキャンティ系でも、見る場所が違う。",
        cards: [
          {
            title: "Chianti DOCG",
            badge: "広い呼称",
            text: "サンジョヴェーゼを主体とする赤。日常的で親しみやすいタイプから、しっかりしたタイプまで幅があります。",
            emphasized: true,
          },
          {
            title: "Chianti Classico DOCG",
            badge: "歴史的地域",
            text: "フィレンツェとシエナの間の歴史的地域に結びつく呼称。黒い雄鶏のマークも手掛かりになります。",
          },
          {
            title: "Riserva",
            badge: "熟成区分",
            text: "通常タイプより長い熟成が必要です。料理側にも肉、香ばしさ、濃さがあると提案しやすくなります。",
          },
          {
            title: "Gran Selezione",
            badge: "さらに選別",
            text: "キャンティ・クラシコの中でも、より厳しい条件を持つ区分です。名前が長いほど、接客では要点を絞って説明します。",
          },
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "では、クラシコのほうが必ずおいしい？",
        paragraphs: [
          "これは危ない質問です。『おいしい』は、価格や規定だけでなく、飲む人の好みと料理で変わります。軽いトマトパスタに、力強いリゼルヴァが常に最適とは限りません。",
          "接客では『格上です』より、『より地域性と構造を意識した選択になります』のほうが安全です。",
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "料理で変える",
        heading: "どちらを前に出すかは、料理の強さで決める。",
        rows: [
          {
            question: "トマトソースの軽いパスタ",
            answer: "若いキャンティや軽めのクラシコ。タンニンと樽が強すぎないものを選びます。",
          },
          {
            question: "ビステッカや炭火の肉",
            answer: "キャンティ・クラシコ、リゼルヴァ、グラン・セレツィオーネまで候補に入ります。",
          },
          {
            question: "酸が苦手なお客様",
            answer: "サンジョヴェーゼらしい酸をどう感じるかを確認します。品種の典型と好みがずれる可能性があります。",
          },
          {
            question: "地名の違いに興味がある",
            answer: "キャンティとクラシコの飲み比べを提案できます。上下ではなく、土地の読み比べにします。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "高級版と言い切らない。",
        quote: "キャンティ・クラシコは、キャンティの単なる高い版というより、歴史的な地域に結びついた別の呼称です。今日は軽く飲むならこちら、肉料理に寄せるならこちら、という選び方ができます。",
        paragraph: "お客様は制度の正確な説明だけを求めているわけではありません。違いを料理選びへつなげると、知識がそのまま提案になります。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "似た名前ほど、地理と区分を分ける。",
        paragraphs: [
          "キャンティとキャンティ・クラシコは、どちらもサンジョヴェーゼを軸にするトスカーナの赤ですが、キャンティ・クラシコは歴史的地域に結びついた独立したDOCGです。だから『上位版』とだけ覚えるより、どの土地の、どの熟成区分の、どんな料理向けのワインかまで分けて提案します。",
        ],
      },
    ],
    next: {
      title: "では、サンジョヴェーゼが好きなら何を出す？",
      text: "品種名が分かっても、キャンティ、ブルネッロ、ヴィーノ・ノービレでは体験が変わります。次は同じ品種が別名のワインになる理由へ進みます。",
      href: "/reading/sangiovese-many-names",
    },
    sources: [
      {
        label: "Consorzio Vino Chianti — Chianti identikit",
        href: "https://www.consorziovinochianti.it/chianti-identikit/?lang=en",
      },
      {
        label: "Consorzio Chianti Classico — Timeline",
        href: "https://www.chianticlassico.com/en/100-years/timeline/",
      },
      {
        label: "Consorzio Chianti Classico — Tipologie",
        href: "https://www.chianticlassico.com/vino/tipologie/",
      },
    ],
  },
  {
    slug: "sangiovese-many-names",
    caseNumber: "05",
    label: "品種と土地",
    title: "「サンジョヴェーゼが好き」と言われたら、どこまで絞る？",
    shortTitle: "サンジョヴェーゼの別名",
    description: "同じサンジョヴェーゼから、なぜ複数の有名ワインが生まれるのかを整理する記事。",
    readTime: "10分",
    order: "「サンジョヴェーゼが好きです。ラベルにサンジョヴェーゼと書いていなくても、近いものはありますか？」",
    heroImage: "/images/stages/pairing.webp",
    heroAlt: "赤ワインと料理が並ぶペアリングの食卓",
    intro: "品種名で好みを伝えられるお客様は、かなり良い手掛かりをくれています。しかし、まだ一本は決まりません。",
    primaryTakeaway: "サンジョヴェーゼは入口です。土地、呼称、熟成規定、料理の重さで提案は分岐します。",
    previousHref: "/reading/chianti-vs-chianti-classico",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "品種が分かっても、まだ地図が必要。",
        paragraphs: [
          "サンジョヴェーゼはトスカーナを代表する黒ブドウ品種ですが、ラベルには品種名ではなく呼称名が前に出ることが多くあります。キャンティ、キャンティ・クラシコ、ブルネッロ・ディ・モンタルチーノ、ヴィーノ・ノービレ・ディ・モンテプルチアーノなどです。",
          "お客様の『サンジョヴェーゼが好き』を受けたら、次に聞くべきは、酸のある軽快さが好きなのか、熟成した重厚さが好きなのか、料理は何か、です。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "名前を結び直す",
        heading: "同じ品種でも、呼称が体験を変える。",
        cards: [
          {
            title: "キャンティ / キャンティ・クラシコ",
            badge: "食卓に置きやすい酸",
            text: "トマト、肉、チーズなど幅広い料理に提案しやすい入口です。軽快なものから構造のあるものまで幅があります。",
            emphasized: true,
          },
          {
            title: "ブルネッロ・ディ・モンタルチーノ",
            badge: "モンタルチーノの重厚さ",
            text: "モンタルチーノでサンジョヴェーゼはブルネッロと呼ばれます。長い熟成を前提にした、特別感の強い提案です。",
          },
          {
            title: "ロッソ・ディ・モンタルチーノ",
            badge: "同じ土地の若い表情",
            text: "ブルネッロと同じ地域のサンジョヴェーゼでも、より若く親しみやすい方向で提案できます。",
          },
          {
            title: "ヴィーノ・ノービレ",
            badge: "プルニョーロ・ジェンティーレ",
            text: "モンテプルチアーノ周辺では、サンジョヴェーゼの地域的な呼び名を理解しておくとラベルが読めます。",
          },
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "品種名が書いていないと、初心者には不親切では？",
        paragraphs: [
          "イタリアワインは、品種より土地と呼称を前に出す文化が強い領域です。これは不親切というより、ワインを『どこで、どの規定で造られたか』から読む設計です。",
          "だから学習では、品種名だけを覚えるより、品種と呼称をペアで覚えるほうが実践的です。サンジョヴェーゼなら、キャンティ、ブルネッロ、ヴィーノ・ノービレへ自然に枝分かれさせます。",
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "提案を分岐する",
        heading: "好みの言葉を、候補に翻訳する。",
        rows: [
          {
            question: "酸があり、食事に合わせやすい赤が好き",
            answer: "キャンティ、キャンティ・クラシコの若いタイプを前に出します。",
          },
          {
            question: "記念日に、深みのある赤が飲みたい",
            answer: "ブルネッロ・ディ・モンタルチーノを候補にします。料理側にも肉や熟成感がほしいところです。",
          },
          {
            question: "ブルネッロは重すぎるかもしれない",
            answer: "ロッソ・ディ・モンタルチーノで、同じ土地の若い表情を提案できます。",
          },
          {
            question: "名前を覚えたい",
            answer: "品種名、地域名、呼称名を一枚の地図のように整理します。丸暗記より、関係で覚えます。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "品種から入って、土地へ広げる。",
        quote: "サンジョヴェーゼがお好きなら、今日は軽く食事に合わせるならキャンティ系、特別感を出すならブルネッロ系が候補です。どちらの気分に近いですか？",
        paragraph: "この言い方なら、品種の知識をそのまま接客に変換できます。名前を並べるだけでなく、お客様が選びやすい二択にします。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "品種は共通語、呼称は文脈。",
        paragraphs: [
          "サンジョヴェーゼは重要な共通語ですが、完成したワインは土地と呼称で大きく変わります。キャンティは食事に寄り添いやすく、ブルネッロはモンタルチーノで長い熟成を前提にした特別感のある赤です。同じ品種でも、どの地域のどのスタイルかまで聞くと、提案が具体的になります。",
        ],
      },
    ],
    next: {
      title: "では、酸味とタンニンはどう違う？",
      text: "注文では『酸っぱい』『渋い』『軽い』が混ざって使われます。次は、お客様の言葉を味の構造に翻訳します。",
      href: "/reading/acid-vs-tannin",
    },
    sources: [
      {
        label: "Consorzio Chianti Classico — Tipologie",
        href: "https://www.chianticlassico.com/vino/tipologie/",
      },
      {
        label: "Consorzio Brunello di Montalcino — Wines",
        href: "https://www.consorziobrunellodimontalcino.it/en/583/wines",
      },
      {
        label: "Consorzio Vino Nobile di Montepulciano — Cartella stampa",
        href: "https://www.consorziovinonobile.it/wp-content/uploads/2025/01/CARTELLA-STAMPA2025-ENG.pdf",
      },
    ],
  },
  {
    slug: "acid-vs-tannin",
    caseNumber: "06",
    label: "味わいの言語化",
    title: "「酸味は苦手、でも渋すぎない赤がいい」と言われたら？",
    shortTitle: "酸味とタンニン",
    description: "お客様の曖昧な味覚語を、提案に使える条件へ翻訳する記事。",
    readTime: "8分",
    order: "「酸っぱいワインは苦手です。でも、赤なら渋すぎないものがいいです。軽すぎるのも寂しいです」",
    heroImage: "/images/themes/wine.webp",
    heroAlt: "複数のワイングラスが並ぶテーブル",
    intro: "この注文は矛盾しているようで、実はかなり現実的です。問題は、お客様の言葉をそのまま専門用語に置き換えないことです。",
    primaryTakeaway: "酸味は口の中を流す力、タンニンは乾くような収斂感。別の感覚として分けて聞きます。",
    previousHref: "/reading/sangiovese-many-names",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "『酸っぱい』と『渋い』は、別の不快感。",
        paragraphs: [
          "酸味は、レモンやトマトのように口の中をきゅっとさせ、唾液を出させる方向の感覚です。タンニンは、濃いお茶のように口の中が乾く、ざらつく方向の感覚です。",
          "お客様はこの二つを明確に分けて話せるとは限りません。だから接客では、『酸が苦手ですか、渋みが苦手ですか』と試験するのではなく、料理や過去の経験から絞ります。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "候補を置く",
        heading: "似た赤でも、苦手ポイントが違う。",
        cards: [
          {
            title: "バルベーラ",
            badge: "酸を感じやすい",
            text: "タンニンの強さより、酸の明るさが印象に残りやすい候補。酸が本当に苦手なら慎重にします。",
          },
          {
            title: "キャンティ",
            badge: "酸と渋みの両方",
            text: "サンジョヴェーゼらしい酸に加え、料理によってはタンニンも感じます。肉やチーズがあるとまとまりやすい。",
          },
          {
            title: "ヴァルポリチェッラ",
            badge: "若い軽快さ",
            text: "若いタイプは軽快で、強い渋みを避けたい場面に置きやすい候補です。濃さを求めるならリパッソへ分岐します。",
            emphasized: true,
          },
          {
            title: "プリミティーヴォ",
            badge: "果実味と厚み",
            text: "熟した果実味で親しみやすい一方、料理が軽いと甘く重く感じることがあります。",
          },
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "酸が苦手なら、酸の少ないワインを選べばいい？",
        paragraphs: [
          "これも単純ではありません。料理にトマト、レモン、酢、脂がある場合、ワインの酸が全体を整えることがあります。酸を完全に避けると、料理のほうが勝ってワインが鈍く感じられることがあります。",
          "問題は酸の有無ではなく、どの程度で、料理とどう響くかです。接客では『酸が強い』ではなく『後味をすっきりさせる酸』のように機能で伝えると理解されやすくなります。",
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "聞き返しを設計する",
        heading: "苦手の正体を、答えやすく聞く。",
        rows: [
          {
            question: "レモンのような酸っぱさが苦手",
            answer: "酸の高い候補は控えめにし、果実の丸みや提供温度を意識します。",
          },
          {
            question: "口が乾く感じが苦手",
            answer: "タンニンの強い赤を避け、若いヴァルポリチェッラなどを検討します。",
          },
          {
            question: "軽すぎると物足りない",
            answer: "リパッソや果実味のある南部の赤を候補にします。ただし甘重さには注意します。",
          },
          {
            question: "料理はトマトやチーズが中心",
            answer: "酸を完全に避けず、料理の酸や脂と流れを作れる赤を選びます。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "味覚語を、感覚の二択にする。",
        quote: "酸っぱい感じが苦手なのか、口が乾くような渋みが苦手なのかで選び方が変わります。今日は渋みを抑えつつ、果実味がある赤に寄せましょう。",
        paragraph: "この一文で、お客様の曖昧な注文を責めずに、提案に必要な区分を提示できます。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "酸味とタンニンを混同しない。",
        paragraphs: [
          "酸味は口の中を流して食欲を進める感覚、タンニンは口の中が乾くような渋みの感覚です。お客様の『酸っぱい』『渋い』は混ざって使われることが多いので、過去に苦手だったワインや今日の料理から、どちらを避けたいのかを確認します。",
        ],
      },
    ],
    next: {
      title: "では、ヴァルポリチェッラとアマローネは何が違う？",
      text: "軽い赤の候補として出てきたヴァルポリチェッラは、リパッソやアマローネへ進むと一気に構造が変わります。",
      href: "/reading/valpolicella-ripasso-amarone",
    },
    sources: [
      {
        label: "Consorzio Tutela Vini Valpolicella — Valpolicella DOC",
        href: "https://www.consorziovalpolicella.it/en/types-of-wines/vino-valpolicella-doc/",
      },
      {
        label: "Consorzio Vino Chianti — Chianti identikit",
        href: "https://www.consorziovinochianti.it/chianti-identikit/?lang=en",
      },
      {
        label: "Consorzio Barbera d’Asti e Vini del Monferrato — Barbera d’Asti DOCG",
        href: "https://www.viniastimonferrato.it/en/denominazioni/barbera-asti-docg/",
      },
    ],
  },
  {
    slug: "valpolicella-ripasso-amarone",
    caseNumber: "07",
    label: "造り方の差",
    title: "「ヴァルポリチェッラとアマローネは同じ土地の赤？」と聞かれたら？",
    shortTitle: "ヴァルポリチェッラの分岐",
    description: "同じ地域の赤が、造り方で軽快にも重厚にもなる理由を整理する記事。",
    readTime: "10分",
    order: "「ヴァルポリチェッラが軽くて好きでした。同じ地域なら、アマローネも似た感じで飲めますか？」",
    heroImage: "/images/stages/intermediate.webp",
    heroAlt: "赤ワインのグラスと落ち着いた食卓",
    intro: "これは非常に良い質問です。同じ地域だから似る部分はありますが、造り方が変わると提案先は大きく変わります。",
    primaryTakeaway: "ヴァルポリチェッラ、リパッソ、アマローネは、同じ地域の文脈を持ちながら、軽快さ・濃縮感・料理適性が異なります。",
    previousHref: "/reading/acid-vs-tannin",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "同じ土地でも、同じ重さではない。",
        paragraphs: [
          "ヴァルポリチェッラの赤は、コルヴィーナ、コルヴィノーネ、ロンディネッラなど地域の品種を軸にします。ただし、若いヴァルポリチェッラ、リパッソ、アマローネでは造り方が違います。",
          "若いヴァルポリチェッラの軽快さが好きなお客様に、いきなりアマローネを出すと重すぎる可能性があります。ここでは『同じ地域の階段』として説明すると分かりやすいです。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "階段で覚える",
        heading: "軽快、橋渡し、重厚。",
        cards: [
          {
            title: "Valpolicella DOC",
            badge: "軽快な入口",
            text: "若いタイプはフレッシュで生き生きとした赤。前菜、軽いプリモ、白身肉などにも置きやすい候補です。",
            emphasized: true,
          },
          {
            title: "Valpolicella Ripasso DOC",
            badge: "橋渡し",
            text: "アマローネやレチョートの搾りかすで再発酵させることで、厚み、丸み、構造が増します。",
          },
          {
            title: "Amarone della Valpolicella DOCG",
            badge: "乾燥ブドウの重厚さ",
            text: "ブドウを乾燥させ、糖やポリフェノールが集中した状態から造ります。特別感と濃縮感のある赤です。",
          },
          {
            title: "Recioto della Valpolicella DOCG",
            badge: "甘口の系譜",
            text: "同じ乾燥ブドウの文脈でも、甘口として理解します。アマローネと混同しないことが重要です。",
          },
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "リパッソは、アマローネの安い版？",
        paragraphs: [
          "価格だけで説明すると雑になります。リパッソは、若いヴァルポリチェッラとアマローネの間に置ける橋渡しのスタイルとして理解するほうが実用的です。",
          "軽い赤では物足りないが、アマローネほど重くしたくない。そういう注文でリパッソは強い候補になります。",
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "料理で選ぶ",
        heading: "同じ土地の中で、料理の重さに合わせる。",
        rows: [
          {
            question: "昼に軽いパスタ、前菜中心",
            answer: "若いヴァルポリチェッラを優先します。飲み疲れしにくいことが価値です。",
          },
          {
            question: "煮込み、肉、熟成チーズ",
            answer: "リパッソを候補にします。丸みと構造が料理の厚みに追いつきます。",
          },
          {
            question: "記念日で、ゆっくり濃い赤",
            answer: "アマローネを提案できます。量より体験を重視する場面です。",
          },
          {
            question: "甘い赤が飲みたい",
            answer: "レチョートの領域を説明します。アマローネは濃厚でも基本的には甘口説明にしません。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "同じ地域の階段として説明する。",
        quote: "軽いヴァルポリチェッラがお好きなら、アマローネは同じ地域でもかなり濃縮感があります。今日は中間のリパッソにするか、軽快なまま行くかを料理で決めましょう。",
        paragraph: "『同じ地域です』で終わらせず、飲む体験の差まで先に伝えます。これはミスマッチを防ぐ接客です。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "土地、品種、製法を分ける。",
        paragraphs: [
          "ヴァルポリチェッラの赤は同じ地域の文脈を持ちますが、若いDOCは軽快、リパッソは再発酵で厚みを足す橋渡し、アマローネは乾燥ブドウから造る重厚なDOCGです。だから『同じ土地だから同じ感じ』ではなく、料理と飲みたい重さに合わせて階段を選びます。",
        ],
      },
    ],
    next: {
      title: "では、魚介には白なら何でもいい？",
      text: "赤の構造を見たら、次は白ワインでも同じことをします。魚介と白を一括りにせず、注文の条件から選びます。",
      href: "/reading/seafood-white-wine",
    },
    sources: [
      {
        label: "Consorzio Tutela Vini Valpolicella — Types of wines",
        href: "https://www.consorziovalpolicella.it/en/types-of-wines/",
      },
      {
        label: "Consorzio Tutela Vini Valpolicella — Valpolicella DOC",
        href: "https://www.consorziovalpolicella.it/en/types-of-wines/vino-valpolicella-doc/",
      },
      {
        label: "Consorzio Tutela Vini Valpolicella — Valpolicella Ripasso DOC",
        href: "https://www.consorziovalpolicella.it/de/tipologie-di-vini-della-valpolicel/valpolicella-ripasso-doc/",
      },
    ],
  },
  {
    slug: "seafood-white-wine",
    caseNumber: "08",
    label: "魚介と白",
    title: "「魚介には白なら何でもいい？」と言われたら？",
    shortTitle: "魚介と白ワイン",
    description: "魚介料理に白ワインを合わせるとき、香り・酸・塩味・油で候補を分ける記事。",
    readTime: "9分",
    order: "「魚介なので白でお願いします。さっぱりがいいですが、料理が寂しくなるのも嫌です。白なら何でも合いますよね？」",
    heroImage: "/images/stages/dish-style.webp",
    heroAlt: "魚介料理を思わせる明るい食卓",
    intro: "魚介に白、という方向性は悪くありません。しかし、それだけでは選択肢が広すぎます。魚介の種類より、調理とソースを見ます。",
    primaryTakeaway: "魚介には白、で止めず、塩味・酸・香り・油・料理の重さで白ワインを選び分けます。",
    previousHref: "/reading/valpolicella-ripasso-amarone",
    sections: [
      {
        kind: "text",
        number: "01",
        eyebrow: "先に答える",
        heading: "白ワインは一種類の味ではない。",
        paragraphs: [
          "魚介料理に白ワインは自然な選択です。ただし、刺身に近い軽さ、貝の塩味、フリットの油、クリームやバターの厚みでは、欲しい白の性格が変わります。",
          "お客様の『さっぱり、でも寂しくない』は、酸だけで軽く流すのではなく、香りやミネラル感、果実の厚みを少し持たせたい注文として読めます。",
        ],
      },
      {
        kind: "cards",
        number: "02",
        eyebrow: "候補を分ける",
        heading: "同じ白でも、役割が違う。",
        cards: [
          {
            title: "Gavi",
            badge: "コルテーゼの清涼感",
            text: "ピエモンテ南部のコルテーゼから造られる白。繊細な魚介や前菜に置きやすい候補です。",
            emphasized: true,
          },
          {
            title: "Vermentino di Gallura",
            badge: "海沿いの感覚",
            text: "香りと塩味のニュアンスを期待したい場面に。魚介やハーブ、オリーブオイルの料理へ考えやすい白です。",
          },
          {
            title: "Fiano di Avellino",
            badge: "厚みと余韻",
            text: "ただ軽いだけでは物足りないときに候補になります。魚介でもクリーム、焼き目、ソースの厚みがあると置きやすい。",
          },
          {
            title: "Etna Bianco",
            badge: "火山性の緊張感",
            text: "カッリカンテを中心にした白として覚えると、酸と引き締まりを期待したい場面で候補にできます。",
          },
        ],
      },
      {
        kind: "note",
        eyebrow: "Una domanda",
        heading: "魚介なら、赤は全部だめ？",
        paragraphs: [
          "これも言い切りすぎです。魚介でもトマト煮、香草、焼き目、軽い赤を冷やして合わせる場面はあります。ただし、鉄っぽさや生臭さを強める組み合わせもあるので、まずは白を基本線にするのは現実的です。",
          "大事なのは『魚だから白』という暗記ではなく、『この魚介料理のどの要素に、ワインの何を合わせるか』です。",
        ],
      },
      {
        kind: "variations",
        number: "03",
        eyebrow: "料理で選ぶ",
        heading: "魚介の名前より、調理を見る。",
        rows: [
          {
            question: "カルパッチョ、レモン、塩",
            answer: "軽やかで酸のある白。Gaviのように料理を重くしない候補を考えます。",
          },
          {
            question: "貝、ハーブ、オリーブオイル",
            answer: "Vermentinoのように香りと海の印象を持つ白を候補にします。",
          },
          {
            question: "魚介のフリット",
            answer: "油を切る酸と、衣に負けない果実味を見ます。軽すぎる白だけに固定しません。",
          },
          {
            question: "クリーム、バター、焼き目",
            answer: "Fianoのように厚みのある白も候補です。さっぱりだけでは料理に負けることがあります。",
          },
        ],
      },
      {
        kind: "quote",
        number: "04",
        eyebrow: "接客の言葉にする",
        heading: "白を、さっぱり一辺倒にしない。",
        quote: "魚介なので白を軸にしましょう。ただ、今日は軽く流すだけでなく少し満足感も欲しいとのことなので、料理のソースに合わせて、すっきり系か少し厚みのある白かを選びます。",
        paragraph: "この言い方なら、魚介に白という一般論を受け止めつつ、提案の精度を一段上げられます。",
      },
      {
        kind: "text",
        number: "05",
        eyebrow: "30秒で説明する",
        heading: "魚介と白は、入口であって答えではない。",
        paragraphs: [
          "魚介には白ワインが自然な基本線ですが、白にも軽いもの、香りのあるもの、厚みのあるものがあります。カルパッチョなら酸と軽さ、貝やハーブなら香りと塩味、フリットなら油を切る酸、クリームや焼き目なら厚みを見ます。魚介の名前だけでなく、調理とソースから選ぶと提案が具体的になります。",
        ],
      },
    ],
    next: {
      title: "次は、白ワインの品種名と地名を分ける",
      text: "Gavi、Soave、Fiano、Greco、Vermentino。白でも品種名と呼称名が混ざります。次の記事では、白ワインのラベルを読む地図を作ります。",
    },
    sources: [
      {
        label: "Consorzio Tutela del Gavi — Viticoltura",
        href: "https://www.consorziogavi.com/en/viticoltura/",
      },
      {
        label: "Consorzio Tutela Vini d’Irpinia — Vini",
        href: "https://consorziovinidirpinia.it/vini/",
      },
      {
        label: "Consorzio Tutela Vini Etna DOC — Official site",
        href: "https://www.consorzioetnadoc.com/",
      },
    ],
  },
];

export function getReadingArticle(slug: string) {
  return readingArticles.find((article) => article.slug === slug);
}
