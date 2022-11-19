<script lang="ts">
  import { base } from "$app/paths";
  import type { PageData } from "./$types";
  import ArticleCard from "@/components/blog/ArticleCard.svelte";
  const bgCssPath = `${base}/style/bg2.css`;

  export let data: PageData;

  const { tag, posts } = data;
</script>

<svelte:head>
  <title>Under Construction | Blog</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <h1>Blog</h1>
  <h2>#{tag}の検索結果</h2>
  <div class="contents-container">
    {#if posts.length === 0}
      <p>見つかりませんでした。</p>
    {:else}
      {#each posts as metadata}
        <ArticleCard {metadata} />
      {/each}
    {/if}
  </div>
</main>

<style>
  :global(.header-margin) {
    height: 10rem;
  }
  @media (max-width: 1024px) {
    :global(.header-margin) {
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
