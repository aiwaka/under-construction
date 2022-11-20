<script lang="ts">
  import { base } from "$app/paths";
  import type { PageData } from ".svelte-kit/types/src/routes/blog/tag/[tag]/$types";
  import ArticleCard from "@/components/blog/ArticleCard.svelte";
  const bgCssPath = `${base}/style/bg2.css`;

  export let data: PageData;
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
    <div class="contents-container">
      {#each data.post as metadata}
        <ArticleCard {metadata} />
      {/each}
    </div>
  {/if}
</main>

<style>
  .header-margin {
    height: 10rem;
  }
  @media (max-width: 1024px) {
    .header-margin {
      height: 13rem;
    }
  }
  .main-container {
    width: 70%;
    margin: auto;
  }
  @media (max-width: 1024px) {
    .main-container {
      width: 85%;
    }
  }
  .contents-container {
    margin: 2rem auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5%;
  }
  @media (max-width: 1024px) {
    .contents-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
