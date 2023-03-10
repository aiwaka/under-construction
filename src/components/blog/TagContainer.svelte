<script lang="ts">
  import ArticleTag from "./ArticleTag.svelte";
  export let tagList: string[];
</script>

<div class="tag-container">
  {#each tagList as tag}
    <ArticleTag {tag} />
  {/each}
</div>

<style>
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0.7rem auto;
  }
</style>
