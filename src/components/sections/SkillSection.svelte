<script lang="ts">
  import type { AllowedName } from "@components/allowdServiceName";
  import ServiceIcon from "@components/ServiceIcon.svelte";
  import IndexBar from "@components/IndexBar.svelte";

  interface SkillData {
    name: string;
    icon: AllowedName | AllowedName[];
    history: string;
    description: string;
  }
  const languageTableData: SkillData[] = [
    {
      name: "C/C++",
      icon: ["c", "c++"],
      history: "8年",
      description:
        "高校1年生からゲーム作成のためCに興味を持ち、粗雑ではありますがゲームを作りました。大学に入ってからは主にC++に移行してC言語の記述を用いています。C++で有限要素法のソルバーを制作したほか、シューティングゲームや物理エンジンを作りました。",
    },
    {
      name: "Python",
      icon: "python",
      history: "4年",
      description:
        "書くのが簡単なので、継続的に開発しない様々なものに対して使っています。競技プログラミングやコーディングテスト、小規模な数値計算には主にPythonを使い、メインのサーバー開発言語としても用いています。以前にハッカソンに参加した際は、WebフレームワークFlaskを用いてバックエンドサーバー開発を行い、努力賞をいただきました。",
    },
    {
      name: "HTML/CSS",
      icon: ["html", "css"],
      history: "9年",
      description:
        "ウェブ周りの必須ツールとして一通りの知識があります。最近は「正しいマークアップ」を意識し、標準規格の定めるタグの役割やアクセシビリティをきちんと考慮した設計を心がけています。",
    },
    {
      name: "JavaScript",
      icon: ["js", "node"],
      history: "7年（Node.jsは3年）",
      description:
        "高校生のとき学校から配布されたiPadで、使うのが許されていたアプリに搭載されていたブラウザで遊ぶために触り始めたのが最初です。現在は基本的にフレームワークを用い、ウェブアプリケーションやウェブサイトの開発しています。",
    },
    {
      name: "Rust",
      icon: "rust",
      history: "1年",
      description:
        "一部の人の煽り文句に誘われて触ってみたところハマってしまった言語です。最も好きな言語はと聞かれれば間違いなくRustと答えます。主にシステムツールの開発を行うほか、数値計算や、ゲームエンジンライブラリを用いてゲーム制作も行っています。先日OSSとしてCLIツールをリリースしました。また、WebAssemblyの生成にも用いており、マークダウンエディタ等をウェブアプリに組み込んでいます。",
    },
    {
      name: "Fortran",
      icon: "fortran",
      history: "1年",
      description:
        "研究室で用いているために学んだ言語です。私の研究における数値計算のために用いています。近年（なぜか）発展が著しいため研究室の開発環境改善にも力を入れたいと思っています。",
    },
    {
      name: "Unix shell",
      icon: "shell",
      history: "3年",
      description:
        "Unix系OSを触る上で避けては通れない部分なので一通り学習しました。ファイルの管理に役立っています。以前にはVimを呼び出して使うメモ管理ツール等を開発しました。また、破損した計算結果データを検出するスクリプトなどを書いたことで研究にも役立っています。",
    },
    {
      name: "LaTeX",
      icon: "latex",
      history: "4年",
      description:
        "言語ではないかもしれませんがこだわりとして掲載します。大学一回生のときに触れて、以降受けた講義の板書等をすべてLaTeX文書化して保存しています。ノートを取る上で優れた環境とフローを構築できていると自負しています。",
    },
  ];

  interface FrameworkData {
    name: string;
    icon: AllowedName | null;
    langIcon: AllowedName;
    history: string;
    description: string;
  }
  const frameworkTableData: FrameworkData[] = [
    {
      name: "DXライブラリ",
      icon: null,
      langIcon: "c++",
      history: "8年",
      description:
        "C/C++を用いたゲーム開発の際に主に用いています。コードベースで書けるのでとても好きです。",
    },
    {
      name: "Numpy",
      icon: "numpy",
      langIcon: "python",
      history: "4年",
      description: "数値計算や自然言語処理等で用います。",
    },
    {
      name: "Flask",
      icon: "flask",
      langIcon: "python",
      history: "3年",
      description:
        "自作APIを作るときに使っています。ハッカソンでも用いてアプリに組み込んでもらいました。最近はFastAPIに移行しようと考えています。",
    },
    {
      name: "Typescript",
      icon: "ts",
      langIcon: "node",
      history: "2年",
      description:
        "これが使えないとフロントエンド開発は話になりません。当時は型付けの便利さを思い知らされました。",
    },
    {
      name: "Vue.js",
      icon: "vue",
      langIcon: "node",
      history: "3年",
      description:
        "ハッカソンに初めて出たあと、フロントエンドが書ける必要性を感じて学んだフレームワークです。私が作った殆どのウェブアプリケーションはVueを用いています。Vue.jsの大きなバージョンアップの際には、これを用いたアプリでは必ずコードを新バージョンに移行するようにしています。",
    },
    {
      name: "Nuxt.js",
      icon: "nuxt",
      langIcon: "node",
      history: "2年",
      description:
        "Vue.jsでもっといろいろやりたいと思って使い始めたものです。ある程度使いましたが、書き方の規約がなじまなかったこと、バージョンアップへの対応やTypescript対応が遅いことなどを理由にあまり使わなくなりました。最近少し遅れを取り戻したようなのでもう一度触ってみています。",
    },
    {
      name: "Svelte(Kit)",
      icon: "svelte",
      langIcon: "node",
      history: "4ヶ月",
      description:
        "React/Vue論争を見るのが嫌になってきたので他のものを探したら見つけ、使い始めています。後発ゆえ優れていると思える点が多く、Vue使いを意識しているのではと思える使いやすさで今後のメインにできそうです。このウェブサイトはSvelteで作っている他、私の主力のウェブアプリに関してもVue.jsからの移行が完了しました。",
    },
    {
      name: "Astro",
      icon: "astro",
      langIcon: "node",
      history: "1ヶ月",
      description:
        "静的サイトジェネレータを使うべきだと考えるものをいくつか作るようになったところで耳にしたので試しに使ってみています。過去のSvelteで作ったコンポーネントを殆どそのまま使えるため、細かいリファクタリングやデザインの向上に注力できています。使い所を選ぶ気はしますが、うまく使えたらすごくいいものができそうな気がします。CMSとの繋ぎ込みもやってみたい。",
    },
    {
      name: "express",
      icon: null,
      langIcon: "node",
      history: "1年",
      description:
        "Firebaseの管理者用APIを触る際にサーバーが必要になったので学習しました。",
    },
    {
      name: "SASS",
      icon: "sass",
      langIcon: "css",
      history: "2年",
      description:
        "CSSを書きやすくするために勉強しました。フレームワークを用いないときに単体で使うことはなく、主にVueと一緒に用いています。",
    },
    {
      name: "PostCSS",
      icon: "postcss",
      langIcon: "css",
      history: "半年",
      description:
        "Vueをアップデートしたときに存在を知ったので使い始めました。将来の標準化を見越してpostcss-nestingの方を使っています。SASSを使っているときに付きまとった、公式規格に準拠していない違和感を拭うことができる（ことになる）と期待しています。",
    },
    {
      name: "Bevy",
      icon: null,
      langIcon: "rust",
      history: "一年",
      description:
        "珍しいRustのゲームライブラリです。特徴であるECSアーキテクチャをとても気に入り、最近はDXライブラリより使っています。Rustの非常に強力な言語機能を使えるのが最高です。最近はマクロを用いて長めの構文を楽に書く手法などを試しています。",
    },
  ];

  interface dbData {
    name: string;
    icon: AllowedName;
    history: string;
    description: string;
  }
  const dbTableData: dbData[] = [
    {
      name: "MySQL",
      icon: "mysql",
      history: "3年",
      description:
        "王道のRDBを一応使えます。何度か触れたハッカソンではこれを使いました。",
    },
    {
      name: "mariaDB",
      icon: "mariadb",
      history: "2年",
      description:
        "ハッカソンで作ったものを後に再開発した際、M1 MacとDockerに対応させるために移行したことがあります。メインでは使っていません。",
    },
    {
      name: "PostgreSQL",
      icon: "psql",
      history: "2年",
      description:
        "いろいろDBを触ってみようと思い、使ってみたところ思いの外さわり心地が良かったので最近はRDBを使う場合これを使っています。",
    },
    {
      name: "Cloud Firestore",
      icon: "firebase",
      history: "2年",
      description:
        "どちらかというと最近使いまくっているのはこちらです。個人開発程度の規模ではNoSQLはとても便利です。RDBの良さも再確認した今日此頃であり、今後は使い分けようと考えています。",
    },
  ];

  interface serviceData {
    name: string;
    icon: AllowedName;
    history: string;
    description: string;
  }
  const serviceTableData: serviceData[] = [
    {
      name: "AWS（EC2）",
      icon: "aws-ec2",
      history: "2年",
      description:
        "何度も言及したハッカソンで、バックエンドのデプロイの際に使用しました。実装・設定したセキュリティ等も問題ないことを当時のメンターの方に確認してもらいました。",
    },
    {
      name: "Docker",
      icon: "docker",
      history: "3年",
      description:
        "ハッカソンで開発環境として使用しました。他人と環境を揃えられるのでやはり便利です。個人でも何度か大きめのフロント・バックエンド複合の開発を行うときにコンテナ利用を試みました。",
    },
    {
      name: "Nginx",
      icon: "nginx",
      history: "3年",
      description:
        "バックエンドサーバーをEC2上に構築する際に用いました。Python（Flask）との統合がしやすかったのが理由です。のちにRaspberry-piを手に入れたときにもこれで家庭内サーバーを構築しました。",
    },
    {
      name: "Firebase",
      icon: "firebase",
      history: "2年",
      description:
        "フロントエンド開発の鬼になっていたときにバックエンドを全部書いていると死んでしまうので利用しました。無料版しか使っていません。ほとんどのウェブアプリのデプロイもこれで行っています。",
    },
  ];

  let windowWidth = 0;
</script>

<!-- ここでウィンドウサイズを変数にbindする. アイコンサイズを変えるのに使用 -->
<svelte:window bind:innerWidth={windowWidth} />

<section class="skill-section section-item">
  <h2 id="skill">Programming Skill</h2>

  <IndexBar
    indexList={[
      { name: "Language", href: "#skill-lang" },
      { name: "Framework", href: "#skill-framework" },
      { name: "DB", href: "#skill-db" },
      { name: "Tools", href: "#skill-tools" },
    ]}
  />
  <h3 id="skill-lang">Language</h3>
  <table class="lang-table">
    <tbody>
      {#each languageTableData as data}
        <tr class="table-row">
          <th class="name">
            {#if Array.isArray(data.icon)}
              {#each data.icon as icon}
                <ServiceIcon
                  name={icon}
                  size={windowWidth < 1024 ? "small" : "normal"}
                />
              {/each}
            {:else}
              <ServiceIcon
                name={data.icon}
                size={windowWidth < 1024 ? "small" : "normal"}
              />
            {/if}
            <span>{data.name}</span>
          </th>
          <td class="desc">
            <p>
              使用歴：{data.history}
            </p>
            <p>
              {data.description}
            </p>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h3 id="skill-framework">Framework</h3>
  <table class="framework-table">
    <tbody>
      {#each frameworkTableData as data}
        <tr class="table-row">
          <th class="name">
            <div>
              <ServiceIcon
                name={data.langIcon}
                size={windowWidth < 1024 ? "2rem" : "small"}
              />
            </div>
            {#if data.icon}
              <ServiceIcon
                name={data.icon}
                size={windowWidth < 1024 ? "small" : "normal"}
              />
            {/if}
            <span>{data.name}</span>
          </th>
          <td class="desc"
            ><p>
              使用歴：{data.history}
            </p>
            <p>
              {data.description}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>

  <h3 id="skill-db">DB</h3>
  <table class="db-table">
    <tbody>
      {#each dbTableData as data}
        <tr class="table-row">
          <th class="name">
            {#if data.icon}
              <ServiceIcon
                name={data.icon}
                size={windowWidth < 1024 ? "small" : "normal"}
              />
            {/if}
            <span>{data.name}</span>
          </th>
          <td class="desc"
            ><p>
              使用歴：{data.history}
            </p>
            <p>
              {data.description}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>

  <h3 id="skill-tools">Services/Cloud/Tools</h3>
  <table class="tools-table">
    <tbody>
      {#each serviceTableData as data}
        <tr class="table-row">
          <th class="name">
            {#if data.icon}
              <ServiceIcon
                name={data.icon}
                size={windowWidth < 1024 ? "small" : "normal"}
              />
            {/if}
            <span>{data.name}</span>
          </th>
          <td class="desc"
            ><p>
              使用歴：{data.history}
            </p>
            <p>
              {data.description}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  table {
    margin: 2rem 3rem;
    border-collapse: collapse;
  }
  @media (max-width: 1024px) {
    table {
      margin: 2rem 0.8rem;
    }
  }
  .table-row {
    border: 1px solid darkslateblue;
  }
  .table-row > th {
    width: 25%;
  }
  .table-row > td,
  th {
    padding: 2rem 2.4rem;
  }
  @media (max-width: 1024px) {
    .table-row > td,
    th {
      padding: 1rem 1rem;
    }
  }
  .table-row:nth-child(odd) {
    background-color: rgba(210, 210, 220, 0.8);
  }
  .table-row:nth-child(even) {
    background-color: rgba(240, 240, 250, 0.8);
  }
  .table-row .name > span {
    display: block;
  }
</style>
