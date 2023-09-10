<script lang="ts">
  import type { LineData } from "@lib/types";

  export let lineData: LineData;
</script>

<div class="line-container">
  <h4>{lineData.lineName}</h4>
  {#each lineData.stations as { name, slug, disabled }, i}
    {#if disabled}
      <span class="disabled">{name}</span>
    {:else}
      <a href={`station-collections/${slug}`}>
        <span>{name}</span>
      </a>
    {/if}
    {#if i !== lineData.stations.length - 1}
      <span>&mdash;</span>
    {/if}
  {/each}
</div>

<style lang="postcss">
  .line-container {
    padding: 1rem 1.2rem;
    border: 1px solid #777;
    border-radius: 5px;
    margin: 0.6rem auto;
  }
  span.disabled {
    color: rgba(var(--main-font-color-params), 0.3);
  }
</style>
