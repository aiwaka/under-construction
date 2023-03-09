<script lang="ts">
  import type { ArticleAttribute } from "@lib/articles";
  import { dateText, thumbnailPath } from "@lib/utils";
  import ArticleTag from "./ArticleTag.svelte";

  export let metadata: ArticleAttribute;

  const { id, title, thumbnail, date, tags } = metadata;
</script>

<a class="article-link" href={`${import.meta.env.BASE_URL}blog/${id}`}>
  <div class="article-card">
    <div class="img-container">
      <img src={thumbnailPath(thumbnail)} alt="thumbnail" />
    </div>
    <div class="card-contents">
      <h2>{title}</h2>
      <span>{dateText(date)}</span>
      <div class="tag-container">
        {#each tags as tag}
          <ArticleTag {tag} />
        {/each}
      </div>
    </div>
  </div>
</a>

<style>
  /* このリンクの親はグリッドボックスである前提なので, その大きさ指定やgap等の影響を受ける. */
  .article-link {
    display: block;
    width: 100%;
    border: 1px solid var(--main-color);
    border-radius: 3px;
    background-color: rgba(var(--main-bg-params), 0.6);
    overflow: hidden;
    margin: 1.4rem 0;
  }
  .article-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .article-card:hover {
    background-color: var(--main-color);
    color: var(--main-bg-color);
  }
  .img-container {
    border: 4px solid var(--main-color);
    width: 100%;
    height: 12rem;
    clip: rect(0, 0, 0, 0);
  }
  .img-container > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .card-contents {
    padding: 0.5rem 1rem;
  }
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0.7rem auto;
  }
</style>
