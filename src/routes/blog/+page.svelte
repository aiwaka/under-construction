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
      tagList={["a", "i"]}
    />
    <ArticleCard
      id="test-page2"
      title="test2"
      thumbnailFilename="img2.PNG"
      date={new Date(2022, 10, 17)}
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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1024px) {
    .contents-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
