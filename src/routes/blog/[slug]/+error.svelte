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
    <h1>ページが見つかりませんでした。</h1>
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
</style>
