<script lang="ts">
  import type { LineDataSchema } from "@lib/types";

  import StationPageLink from "./StationPageLink.svelte";

  export let lineData: LineDataSchema;
</script>

<div class="line-container">
  <h4 id={lineData.formalLineName}>{lineData.formalLineName}</h4>
  {#each lineData.stations as sta, i}
    {#if sta.notBelongsToLine}({/if}<StationPageLink
      data={sta}
    />{#if sta.notBelongsToLine}){/if}{#if i !== lineData.stations.length - 1}<span
        >&mdash;</span
      >{/if}
  {/each}
</div>

<style lang="postcss">
  .line-container {
    padding: 1rem 1.2rem;
    border: 1px solid #777;
    border-radius: 5px;
    margin: 0.6rem auto;
  }
</style>
