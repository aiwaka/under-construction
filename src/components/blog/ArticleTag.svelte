<script lang="ts">
  export let tag: string;
</script>

<div class="article-tag">
  #{tag}
</div>

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
</style>
