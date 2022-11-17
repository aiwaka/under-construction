<script>
  import { base } from "$app/paths";
  import ArticleCard from "@/components/blog/ArticleCard.svelte";
  const bgCssPath = `${base}/style/bg2.css`;
</script>

<svelte:head>
  <title>Under Construction | Blog</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="contents">
  <main class="main-container">
    <div class="contents-container">
      <ArticleCard
        title="test"
        thumbnailFilename="blue_square.png"
        date={new Date()}
        overview="testtest"
        tag={["a", "i"]}
      />
    </div>
  </main>
</div>

<style>
  body::before {
    background-image: url("./img/blue_2.png");
  }
</style>
