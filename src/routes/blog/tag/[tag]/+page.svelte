<script lang="ts">
  import { base } from "$app/paths";
  import type { PageData } from ".svelte-kit/types/src/routes/blog/tag/[tag]/$types";
  import ArticleCardContainer from "@/components/blog/ArticleCardContainer.svelte";

  export let data: PageData;

  const bgCssPath = `${base}/style/bg2.css`;
</script>

<svelte:head>
  <title>Under Construction | Blog | #{data.tag}の検索結果</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <h1>Blog</h1>
  <h2>#{data.tag}の検索結果</h2>
  {#if data.post.length === 0}
    <p>一致するものはありませんでした。</p>
  {:else}
    <ArticleCardContainer cardList={data.post} />
  {/if}
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
