<script lang="ts">
  export let tag: string;
</script>

<!-- anchorタグを入れ子にすることはマークアップ上でおかしい. ボタンを用い, データ属性を利用する. -->
<!-- この属性を利用するため, レイアウトファイル上でイベントリスナを設定している. -->
<button
  data-tag-url={`${import.meta.env.BASE_URL}blog/tags/${tag}`}
  class="article-tag"
>
  #{tag}
</button>

<style>
  .article-tag {
    background-color: rgba(var(--main-color-params), 0.8);
    border: 1px solid var(--main-color);
    border-radius: 3px;
    font-size: 90%;
    color: var(--main-bg-color);
    width: fit-content;
    padding: 0.1rem 0.4rem;
  }
  .article-tag:first-child {
    margin-left: 0;
  }
  .article-tag:hover {
    cursor: pointer;
    background-color: var(--main-bg-color);
    color: var(--main-color);
  }
</style>
