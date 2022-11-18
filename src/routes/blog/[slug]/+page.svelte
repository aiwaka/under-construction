<script lang="ts">
  import type { PageData } from "./$types";
  import { base } from "$app/paths";

  const bgCssPath = `${base}/style/bg2.css`;

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.post.meta.title}</title>
  <link rel="stylesheet" href={bgCssPath} />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <div>
    <h1>{data.post.meta}</h1>
    <!-- <div>{@html data.post.body}</div> -->
    <svelte:component this={data.post.body} />
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
