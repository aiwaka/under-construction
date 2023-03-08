<script lang="ts">
  import type { ArticleAttribute } from "@lib/articles";
  import ArticleCard from "@components/blog/ArticleCard.svelte";

  export let cardList: ArticleAttribute[];
</script>

<div class="contents-card-container">
  {#each cardList as metadata (metadata.id)}
    <ArticleCard {metadata} />
  {/each}
</div>

<style>
  .contents-card-container {
    margin: 2rem auto;
    padding-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5%;
  }
  @media (max-width: 1024px) {
    .contents-card-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
