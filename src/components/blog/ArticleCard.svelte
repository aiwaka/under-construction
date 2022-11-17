<script lang="ts">
  import { base } from "$app/paths";

  export let title: string;
  export let thumbnailFilename: string;
  export let date: Date;
  export let overview: string;
  export let tag: string[];

  const thumbnailPath = `${base}/blog/thumb/${thumbnailFilename}`;
</script>

<div class="article-card">
  <div class="img-container">
    <img src={thumbnailPath} alt="thumbnail" />
  </div>
  <div class="card-contents">
    <h2>{title}</h2>
    <span>{date.toString()}</span>
    <p>{overview}</p>
    {#each tag as item}
      {`#${item}`}
    {/each}
  </div>
</div>

<style>
  .article-card {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .img-container {
    width: 20%;
    height: 20%;
  }
  .img-container > img {
    width: 100%;
    height: 100%;
    clip-path: path("M 0 200 L 0,75 A 5,5 0,0,1 150,75 L 200 200 z");
  }
</style>
