<script>
  import { base } from "$app/paths";
  import ArticleCard from "@/components/blog/ArticleCard.svelte";
  const bgCssPath = `${base}/style/bg2.css`;
</script>

<svelte:head>
  <title>Under Construction | Blog</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <h1>Blog</h1>
  <div class="contents-container">
    <ArticleCard
      id="test-page"
      title="test"
      thumbnailFilename="blue_square.png"
      date={new Date()}
      overview="testtest"
      tagList={["a", "i"]}
    />
  </div>
</main>

<style>
  .header-margin {
    height: 10rem;
  }
  .main-container {
    width: 70%;
    margin: auto;
  }
  @media (max-width: 1024px) {
    .main-container {
      width: 95%;
    }
  }
  .contents-container {
    margin: 2rem auto;
    display: flex;
  }
</style>
