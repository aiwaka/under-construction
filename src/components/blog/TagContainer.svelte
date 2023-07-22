<script lang="ts">
  import BlogTag from "./BlogTag.svelte";
  export let tagList: string[];
</script>

<div class="tag-container">
  {#each tagList as tag}
    <BlogTag {tag} />
  {/each}
</div>

<style>
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem 0.2rem;
    margin: 0.3rem auto;
  }
</style>
