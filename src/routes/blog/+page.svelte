<script lang="ts">
  import { base } from "$app/paths";
  import type { PageData } from "./$types";
  import ArticleCardContainer from "@/components/blog/ArticleCardContainer.svelte";

  export let data: PageData;

  const bgCssPath = `${base}/style/bg2.css`;
</script>

<svelte:head>
  <title>Under Construction | Blog</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <h1>Blog</h1>
  <ArticleCardContainer cardList={data.post} />
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
    .header-margin {
      height: 13rem;
    }
    .main-container {
      width: 85%;
    }
  }
</style>
