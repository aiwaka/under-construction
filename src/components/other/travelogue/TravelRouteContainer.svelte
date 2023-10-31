<script lang="ts">
  import type { TravelRouteEntry } from "@lib/other/station-collections";

  export let routeData: TravelRouteEntry;
</script>

<div class="travel-route-container">
  {#each routeData.route as route}
    <div class="route-item">
      {#if route.stationId}
        <a
          href={import.meta.env.BASE_URL +
            "station-collections/" +
            route.stationId}
        >
          <span>{route.name}</span>
        </a>
      {:else}
        <span>{route.name}</span>
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  .travel-route-container {
    display: flex;
    flex-wrap: wrap;
  }
  .route-item {
    border: 1px solid #777;
    border-radius: 3px;
    padding: 0.3rem 0.2rem;
  }
</style>
