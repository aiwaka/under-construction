<script lang="ts">
  import { base } from "$app/paths";
  import ArticleTag from "./ArticleTag.svelte";

  export let id: string;
  export let title: string;
  export let thumbnailFilename: string;
  export let date: Date;
  export let overview: string;
  export let tagList: string[];

  const thumbnailPath = `${base}/blog/thumb/${thumbnailFilename}`;

  const dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
</script>

<a href={`/blog/${id}`}>
  <div class="article-card">
    <div class="img-container">
      <img src={thumbnailPath} alt="thumbnail" />
    </div>
    <div class="card-contents">
      <h2>{title}</h2>
      <span>{dateText}</span>
      <p>{overview}</p>
      <div class="tag-container">
        {#each tagList as tag}
          <ArticleTag {tag} />
        {/each}
      </div>
    </div>
  </div>
</a>

<style>
  .article-card {
    border: 1px solid darkslateblue;
    border-radius: 5px;
    background-color: rgba(240, 255, 255, 0.6);
    position: relative;
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .article-card:hover {
    background-color: darkslateblue;
    color: azure;
  }
  .img-container {
    border: 4px solid darkslateblue;
    width: 100%;
    height: 50%;
  }
  .img-container > img {
    width: 100%;
    height: 100%;
  }
  .card-contents {
    padding: 1rem 2rem;
  }
  .tag-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
