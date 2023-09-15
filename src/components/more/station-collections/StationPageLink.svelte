<script lang="ts">
  import type { LineData } from "@lib/types";

  export let data: LineData["stations"][number];
  const { name, slug, disabled } = data;
</script>

{#if disabled}
  <span class="disabled">{name}</span>
{:else}
  <a href={`${import.meta.env.BASE_URL}station-collections/${slug}`}>
    <span>{name}</span>
  </a>
{/if}

<style lang="postcss">
  span.disabled {
    color: rgba(var(--main-font-color-params), 0.3);
  }
</style>
