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
<div>
  <h1>{data.post.meta}</h1>
  <div>{@html data.post.body}</div>
</div>

<style>
  .header-margin {
    height: 10rem;
  }
</style>
