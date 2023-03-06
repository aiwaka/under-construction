<!-- 言語アイコンを並べて表示するのを簡単にするコンポーネント. -->
<script lang="ts">
  import type { AllowedName } from "@components/allowdServiceName";
  import ServiceIcon from "@components/ServiceIcon.svelte";
  export let langList: AllowedName[];
</script>

<div class="language-icon-container">
  {#each langList as lang}
    <ServiceIcon name={lang} size={"small"} />
  {/each}
</div>

<style>
  .language-icon-container {
    float: right;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: rgba(72, 61, 139, 0.1);
    border-radius: 1rem;
    padding: 0.2rem 0.8rem;
    margin: 1rem 0.5rem;
    width: 30%;
  }
</style>
