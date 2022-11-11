<script lang="ts">
  import type { AllowedName } from "@/components/allowdServiceName";
  import ServiceIcon from "@/components/ServiceIcon.svelte";
  import IndexBar from "@/IndexBar.svelte";

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
        "高校1年生からゲーム作成のためCに興味を持ち、粗雑ではありますがゲームを作りました。大学に入ってからは主にC++に移行してC言語の記述を用いています。C++で有限要素法のソルバーを制作したほか、シューティングゲームや物理エンジンを作りました。"
    },
    {
      name: "Python",
      icon: "python",
      history: "4年",
      description:
        "書くのが簡単なので、継続的に開発しない様々なものに対して使っています。競技プログラミングやコーディングテスト、講義課題の数値計算等も主にPythonを使います。また、メインのサーバーサイド開発言語として用いています。以前にハッカソンに参加した際は、WebフレームワークFlaskを用いてバックエンドサーバー開発を行い、努力賞をいただきました。"
    },
    {
      name: "HTML/CSS",
      icon: ["html", "css"],
      history: "9年",
      description: "ウェブ周りの必須ツールとして一通りの知識があります。"
    },
    {
      name: "JavaScript",
      icon: ["js", "node"],
      history: "7年（Node.jsは3年）",
      description:
        "高校生のとき学校から配布されたiPadで使うのが許されていたファイル管理アプリの中のブラウザを用いて遊ぶために触り始めたのが最初です。現在は基本的にフレームワークを用い、ウェブアプリケーションやウェブサイトの開発しています。"
    },
    {
      name: "Rust",
      icon: "rust",
      history: "1年",
      description:
        "一部の人の煽り文句に誘われて触ってみたところハマってしまった言語です。最も好きな言語はと聞かれれば間違いなくRustと答えます。主にシステムツールの開発を行うほか、数値計算や、ゲームエンジンライブラリを用いてゲーム制作も行っています。先日OSSとしてCLIツールをリリースしました。また、WebAssemblyのコード生成にも用いており、マークダウンエディタ等をウェブアプリに組み込んでいます。"
    },
    {
      name: "Fortran",
      icon: "fortran",
      history: "1年",
      description:
        "研究室で用いているために学んだ言語です。私の研究における数値計算のために用いています。近年（なぜか）発展が著しいため研究室の開発環境改善にも力を入れたいと思っています。"
    },
    {
      name: "Unix shell",
      icon: "shell",
      history: "3年",
      description:
        "Unix系OSを触る上で避けては通れない部分なので一通り学習しました。ファイルの管理に役立っており、Vimを呼び出して使うメモ管理ツール等を開発しました。"
    },
    {
      name: "LaTeX",
      icon: "latex",
      history: "4年",
      description:
        "言語ではないかもしれませんがこだわりとして掲載します。大学一回生のときに触れて、以降受けた講義の板書等をすべてLaTeX文書化して保存しています。"
    }
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
        "C/C++を用いたゲーム開発の際に主に用いています。コードベースで書けるのでとても好きです。"
    },
    {
      name: "Numpy",
      icon: "numpy",
      langIcon: "python",
      history: "4年",
      description: "数値計算や自然言語処理等で用います。"
    },
    {
      name: "Flask",
      icon: "flask",
      langIcon: "python",
      history: "3年",
      description:
        "自作APIを作るときに使っています。ハッカソンでも用いてアプリに組み込んでもらいました。最近はFastAPIに移行しようと考えています。"
    },
    {
      name: "Typescript",
      icon: "ts",
      langIcon: "node",
      history: "2年",
      description: "これが使えないと話になりません。当時は型付けの便利さを思い知らされました。"
    },
    {
      name: "Vue.js",
      icon: "vue",
      langIcon: "node",
      history: "3年",
      description:
        "ハッカソンに初めて出たあと、フロントエンドが書ける必要性を感じて学んだフレームワークです。私の殆どのウェブアプリケーションをVueで作りました。Vue.jsの大きなバージョンアップの際に、これを用いたアプリでは必ずコードを移行するようにしています。"
    },
    {
      name: "Nuxt.js",
      icon: "nuxt",
      langIcon: "node",
      history: "2年",
      description:
        "Vue.jsでもっといろいろやりたいと思って使い始めたものです。ある程度使いましたが、書き方の規約がなじまなかったこと、バージョンアップへの対応やTypescript対応が遅いことなどを理由にあまり使わなくなりました。最近少し遅れを取り戻したようなのでもう一度触ってみています。"
    },
    {
      name: "Svelte",
      icon: "svelte",
      langIcon: "node",
      history: "1ヶ月",
      description:
        "React/Vue論争を見るのが嫌になってきたので他のものを探したら見つけ、使い始めています。後発ゆえ優れていると思える点が多く、Vue使いを意識しているのではと思える使いやすさで今後のメインにできそうです。このウェブサイトはSvelteで作っています。"
    },
    {
      name: "express",
      icon: null,
      langIcon: "node",
      history: "1年",
      description: "Firebaseの管理者用APIを触る際にサーバーが必要になったので学習しました。"
    },
    {
      name: "SASS",
      icon: "sass",
      langIcon: "css",
      history: "2年",
      description:
        "CSSを書きやすくするために勉強しました。フレームワークを用いないときに単体で使うことはなく、主にVueと一緒に用いています。"
    },
    {
      name: "PostCSS",
      icon: "postcss",
      langIcon: "css",
      history: "半年",
      description:
        "Vueをアップデートしたときに存在を知ったので使い始めました。将来の標準化を見越してpostcss-nestingの方を使っています。SASSを使っているときに付きまとった、公式規格に準拠していない違和感を拭うことができる（ことになる）と期待しています。"
    },
    {
      name: "Bevy",
      icon: null,
      langIcon: "rust",
      history: "一年",
      description:
        "珍しいRustのゲームライブラリです。ECSアーキテクチャをとても気に入り、最近はDXライブラリより使っています。Rustの非常に強力な言語機能を使えるのが最高です。"
    }
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
      description: "王道のRDBを一応使えます。何度か触れたハッカソンではこれを使いました。"
    },
    {
      name: "mariaDB",
      icon: "mariadb",
      history: "2年",
      description:
        "ハッカソンで作ったものを後に再開発した際、M1 MacとDockerに対応させるために移行したことがあります。メインでは使っていません。"
    },
    {
      name: "PostgreSQL",
      icon: "psql",
      history: "2年",
      description:
        "いろいろDBを触ってみようと思い、使ってみたところ思いの外さわり心地が良かったので最近はこればかり使っています。"
    },
    {
      name: "Cloud Firestore",
      icon: "firebase",
      history: "2年",
      description:
        "上のは嘘です。最近使いまくっているのはこちらです。個人開発程度の規模ではNoSQLはとても便利です。"
    }
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
        "何度も言及したハッカソンで、バックエンドのデプロイの際に使用しました。実装・設定したセキュリティ等も問題ないことを当時のメンターの方に確認してもらいました。"
    },
    {
      name: "Docker",
      icon: "docker",
      history: "3年",
      description:
        "ハッカソンで開発環境として使用しました。他人と環境を揃えられるのでやはり便利です。個人でも何度か大きめのフロント・バックエンド複合の開発を行うときにコンテナ利用を試みました。"
    },
    {
      name: "Nginx",
      icon: "nginx",
      history: "3年",
      description:
        "バックエンドサーバーをEC2上に構築する際に用いました。Python（Flask）との統合がしやすかったのが理由です。のちにRaspberry-piを手に入れたときにもこれで家庭内サーバーを構築しました。"
    },
    {
      name: "Firebase",
      icon: "firebase",
      history: "2年",
      description:
        "フロントエンド開発の鬼になっていたときにバックエンドを全部書いていると死んでしまうので利用しました。無料版しか使っていません。ほとんどのウェブアプリのデプロイもこれで行っています。"
    },
    {
      name: "Vite",
      icon: "vite",
      history: "3ヶ月",
      description:
        "最近見つけたビルドツールです。Vue.jsの環境構築法をアップデートしたときに知り、開発体験がとても良くなったので他のツールと組み合わせても使っています。"
    }
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
      { name: "tools", href: "#skill-tools" }
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
                <ServiceIcon name={icon} size={windowWidth < 1024 ? "small" : "normal"} />
              {/each}
            {:else}
              <ServiceIcon name={data.icon} size={windowWidth < 1024 ? "small" : "normal"} />
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
              <ServiceIcon name={data.langIcon} size={windowWidth < 1024 ? "2rem" : "small"} />
            </div>
            {#if data.icon}
              <ServiceIcon name={data.icon} size={windowWidth < 1024 ? "small" : "normal"} />
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
              <ServiceIcon name={data.icon} size={windowWidth < 1024 ? "small" : "normal"} />
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
              <ServiceIcon name={data.icon} size={windowWidth < 1024 ? "small" : "normal"} />
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
