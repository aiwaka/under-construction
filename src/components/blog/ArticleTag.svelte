<script lang="ts">
  export let tag: string;
</script>

<a href={`/blog/tag/${tag}`}>
  <div class="article-tag">
    #{tag}
  </div>
</a>

<style>
  .article-tag {
    background-color: rgba(var(--main-color-params), 0.8);
    border: 1px solid var(--main-color);
    border-radius: 3px;
    font-size: 90%;
    color: var(--main-bg-color);
    width: fit-content;
    padding: 0.1rem 0.4rem;
    margin: 0.1rem 0.2rem;
  }
  .article-tag:first-child {
    margin-left: 0;
  }
  .article-tag:hover {
    background-color: var(--main-bg-color);
    color: var(--main-color);
  }
</style>
