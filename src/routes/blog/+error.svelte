<script lang="ts">
  import { base } from "$app/paths";

  const bgCssPath = `${base}/style/bg2.css`;
</script>

<svelte:head>
  <title>Not Found</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <div>
    <h1>Not Found</h1>
    <p>ページが見つかりませんでした。</p>
    <p><a href={`${base}/blog`}>BLOGへ</a></p>
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
</style>
