<script lang="ts">
  import AppItem from "@/components/works/AppItem.svelte";
  import SoundcloudItem from "@/components/works/SoundcloudItem.svelte";
  import IndexBar from "@/IndexBar.svelte";
</script>

<section class="works-section section-item">
  <h2 id="works">Works</h2>
  <IndexBar
    indexList={[
      { name: "Music", href: "#works-music" },
      // { name: "Picture", href: "#works-picture" },
      { name: "App", href: "#works-app" }
    ]}
  />

  <h3 id="works-music">Music</h3>
  <span>公開した楽曲の一部を紹介します。</span>
  <h4>SoundCloud</h4>
  <SoundcloudItem trackId={999665578} />
  <SoundcloudItem trackId={804565441} />
  <SoundcloudItem trackId={1380936451} />
  <h4>niconico</h4>
  <p>
    ものすごいコンソールエラーが出るため動画枠は現在非表示です。よろしければリンク先を御覧ください。
  </p>
  <div class="niconico-container">
    <ul>
      <li>
        <a href="https://www.nicovideo.jp/watch/sm33454945"> 青の幻燈 </a>
        [<time datetime="2018-07-01T20:46"> 2018/7/1 </time>]
      </li>
      <li>
        <a href="https://www.nicovideo.jp/watch/sm38351407">汐見橋 </a>
        [<time datetime="2021-03-01T20:12"> 2021/3/1 </time>]
      </li>
      <li>
        <a href="https://www.nicovideo.jp/watch/sm40095155">忘却の河 </a>
        [<time datetime="2022-02-25T20:28"> 2022/2/25 </time>]
      </li>
    </ul>
  </div>

  <h3 id="works-app">Apps</h3>
  <span> 一部の制作物はタイトルがリンクになっておりGitHubリポジトリに飛べます。 </span>
  <AppItem langList={["vite", "ts", "svelte"]} href="">
    <svelte:fragment slot="title">当ウェブサイト</svelte:fragment>
    <svelte:fragment slot="work-period">2022年11月</svelte:fragment>
    <p>制作物を公開するサイトです。昔からやりたかったので勢いで作りました。</p>
  </AppItem>
  <AppItem
    langList={["vue", "ts", "sass", "latex", "firebase", "express"]}
    href={"https://github.com/littleIkawa/aiwaka-bunko"}
  >
    <svelte:fragment slot="title">あいわか文庫</svelte:fragment>
    <svelte:fragment slot="work-period">2021年〜</svelte:fragment>
    <p>PDF文書配布用ウェブサイト・アプリケーションです。</p>
    <p>
      私がLaTeXで作成したPDF等の資産を知人等の限られた範囲で、私と閲覧者の両方ができるだけ簡便に使えるために制作したウェブサイトです。
      二種類のダウンロード方法のサポート、文書へのリクエスト機能、ユーザー個人のお気に入りファイル管理機能等を持っています。
    </p>
    <p>
      リクエストの管理コンソールも用意しました。Firebaseを管理者権限でサーバーで操作し、全体のリクエストを一元的に管理できます。UIはVueで構築し、サーバーはExpressを用いてREST
      APIを構築しました。
    </p>
  </AppItem>
  <AppItem
    langList={["vue", "ts", "sass", "firebase"]}
    href={"https://github.com/littleIkawa/tako_board_easy_app"}
  >
    <svelte:fragment slot="title">Tako Board</svelte:fragment>
    <svelte:fragment slot="work-period">2021年10月〜</svelte:fragment>
    <p>家で飼っているうさぎのお世話を管理するための掲示板ウェブアプリケーションです。</p>
    <p>
      餌やりや水の入れ替え、散歩等の時刻を記録でき、一覧を見返すことができます。
      クライアントである家族に開発中のものを見てもらって機能改善を繰り返しています。
    </p>
  </AppItem>
  <AppItem
    langList={["python", "flask", "mysql", "docker", "aws-ec2", "nginx"]}
    href={"https://github.com/littleIkawa/anime-tinder"}
  >
    <svelte:fragment slot="title">Toonder</svelte:fragment>
    <svelte:fragment slot="work-period">2021年3月, 10月</svelte:fragment>
    <p>TinderライクなUIで機械学習を用いたアニメのマッチングアプリです。</p>
    <p>
      初めてのハッカソン～オンライン開発合宿vol.1～(サポーターズ様、2021年3月開催)にて制作、努力賞を頂きました。
    </p>
    <p>
      私の担当箇所はdocker開発環境の構築とAPIサーバー開発です。
      初めてのチーム開発となり、異なる環境に合わせた開発環境構築、サーバーの基礎的な知識、リーダブルなコードへの意識など、現在の私を支える多くの知見を得ました。
    </p>
    <p>
      またその後に参加した展示イベントで追加の開発の機会を得たため、AWS-EC2とNginxを用いたバックエンドサーバーのデプロイを行いました。
    </p>
  </AppItem>
  <AppItem
    langList={["python"]}
    href={"https://github.com/littleIkawa/year_of_station_by_municipality"}
  >
    <svelte:fragment slot="title"
      >自治体別最古・最近の鉄道駅設置年を抽出するスクリプト</svelte:fragment
    >
    <svelte:fragment slot="work-period">2021年9月</svelte:fragment>
    <p>Wikipediaクローラです。</p>
    <p>
      MANDARA10という日本地図塗り分けアプリを使って鉄道の設置年を使った図を作成するために書いたスクリプトです。
      自治体のページから設置された鉄道駅を順に取得していきデータを取得します。
      スクレイピング独特の例外処理や効率的なログのとり方を工夫しました。
    </p>
  </AppItem>
  <AppItem langList={["rust"]} href={"https://github.com/littleIkawa/bem_laplace_eq_rust"}>
    <svelte:fragment slot="title">Laplace問題の数値計算</svelte:fragment>
    <svelte:fragment slot="work-period">2022年2月</svelte:fragment>
    <p>卒論が終わって余裕ができたので、境界要素法による数値計算をRustで試してみたものです。</p>
  </AppItem>
  <AppItem langList={["rust"]} href={"https://github.com/littleIkawa/block_golf"}>
    <svelte:fragment slot="title">Block Golf （仮）</svelte:fragment>
    <svelte:fragment slot="work-period">2022年6月〜</svelte:fragment>
    <p>Rust製ゲームエンジンBevyを用いたアクションパズルゲームです。</p>
    <p>
      小学生の頃の妄想を今なら作れるのではないかと思い作ってみました。
      ブロックを動かして転がる玉をゴールへ導きます。
      様々なギミックがあるのでそれを利用していきます。
    </p>
    <p>物体間の物理演算を自分で実装しました。それなりに動くものができたので満足です。</p>
  </AppItem>
  <AppItem langList={["c++"]} href={"https://github.com/littleIkawa/shooting_game_cpp_remastered"}>
    <svelte:fragment slot="title">FailOver 2 Remastered</svelte:fragment>
    <svelte:fragment slot="work-period">2022年9月</svelte:fragment>
    <p>
      PC部に所属していた高校生のとき文化祭向けに作ったシューティングゲーム：FailOver
      2をC++で全面的に書き直したものです。
    </p>
    <p>
      とあるインターンに参加し、C++でゲームを作る必要を感じたのもあり、題材として適当なこのゲームを選んでやってみました。
      プログラミングへの考え方が当時と全く変わっており、高い汎用性とコードの可読性を両立したエンジンを書くことができました。
      7年以上の時を経て自分がどう変わったかを見直すことができました（いろいろな意味で）。
    </p>
  </AppItem>
  <AppItem langList={["latex"]} href={"https://github.com/littleIkawa/inochi"}>
    <svelte:fragment slot="title">命の輝きくん</svelte:fragment>
    <svelte:fragment slot="work-period">2020年1月</svelte:fragment>
    <p>
      完全に遊びで、大阪万博2025の公式キャラクター（当時名称不定）をLaTeXのライブラリTikZで描いたものです。
    </p>
  </AppItem>
  <AppItem langList={["rust"]} href={""}>
    <svelte:fragment slot="title">Rhythm Game by Rust（仮）</svelte:fragment>
    <svelte:fragment slot="work-period">2022年10月</svelte:fragment>
    <p>Rust製ゲームエンジンBevyを用いたリズムゲームです。</p>
    <p>
      リズムゲームの面白さについて考え、人間は根本的にリズムを取るのが好きだと考えて、パターンを取り切ると演出と加点が付くシステムを考えました。
      UIは少し質素ですが、Rustの機能をうまくつかって非常に汎用性の高いシンプルなエンジンを構築できました。
    </p>
  </AppItem>
  <AppItem langList={["rust"]} href={"https://github.com/littleIkawa/memo_cli_rust"}>
    <svelte:fragment slot="title">memocr</svelte:fragment>
    <svelte:fragment slot="work-period">2022年11月</svelte:fragment>
    <p>コマンドラインでメモを管理できるツールです。</p>
    <p>
      一通りの編集やファイルの作成・消去操作の他、現在のディレクトリにコピーしたり、簡易なHTTPサーバーを立ててマークダウンをプレビューしたりできます。
    </p>
    <p>
      Cargoのコマンドとして公開しているので誰でもインストールできます。よかったら使ってみてください。
    </p>
  </AppItem>
</section>

<style>
  h3 {
    margin: 2rem auto;
  }
  h4 {
    margin: 2rem auto;
  }
  .niconico-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
