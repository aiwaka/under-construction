<script lang="ts">
  import { base } from "$app/paths";

  export let tag: string;
</script>

<a href={`${base}/blog/tag/${tag}`}>
  <div class="article-tag">
    #{tag}
  </div>
</a>

<style>
  .article-tag {
    background-color: slateblue;
    border: 3px solid darkslateblue;
    border-radius: 4px;
    color: azure;
    width: fit-content;
    padding: 0.3rem 0.8rem;
    margin: 0 0.3rem;
  }
  .article-tag:first-child {
    margin-left: 0;
  }
  .article-tag:hover {
    background-color: azure;
    color: darkslateblue;
  }
</style>
