<script lang="ts">
  import type { TravelRouteEntry } from "@lib/other/station-collections";

  export let routeData: TravelRouteEntry;

  type RouteSchema = (typeof routeData.route)[number];

  /** 宿泊地かどうか判定. 出発と到着の日付が違っていれば宿泊地とする */
  const isStayNode = (route: RouteSchema) => {
    if (route.departureTime === undefined) return false;
    const arr = route.arrivalTime;
    const dep = route.departureTime;
    // yamlからのDateはTZ情報無しなのでUTC付きメソッドで取得しなければ勝手に+9時間されてずれる.
    return (
      arr.getUTCFullYear() !== dep.getUTCFullYear() ||
      arr.getUTCMonth() !== dep.getUTCMonth() ||
      arr.getUTCDate() !== dep.getUTCDate()
    );
  };
  const nextIsOnFoot = (route: RouteSchema) => {
    return route.nextTransport === "onfoot";
  };
  const isPrimaryNode = (route: RouteSchema) => {
    return route.marker?.find(
      (marker) => marker.type === "single" && marker.label === "primary",
    );
  };
</script>

<div class="legend">
  <div class="legend-label">凡例</div>
  <div class="legend-item primary-node route-node">
    <span>主要な訪問地</span>
  </div>
  <div class="legend-item stay-node route-node">
    <span>宿泊地</span>
  </div>
</div>
<div class="travel-route-container">
  {#each routeData.route as route, i}
    <div class="route-item">
      {#if i !== 0}
        {@const prevIsOnFoot = nextIsOnFoot(routeData.route[i - 1])}
        {#if prevIsOnFoot}
          <div class="dot-spacer"></div>
        {/if}
        <div class="edge former" class:dashed={prevIsOnFoot}></div>
      {/if}
      <div
        class="route-node"
        class:primary-node={isPrimaryNode(route)}
        class:stay-node={isStayNode(route)}
      >
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
      {#if i !== routeData.route.length - 1}
        <div class="edge latter" class:dashed={nextIsOnFoot(route)}></div>
      {/if}
      {#if route.nextTransport && route.nextTransport !== "onfoot"}
        <div class="edge short"></div>
        <div class="transportation-label">{route.nextTransport}</div>
        <div class="edge short"></div>
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  .legend {
    display: flex;
    flex-wrap: wrap;
    border: 3px double black;
    padding: 1rem 1.2rem;
    width: 100%;
  }
  .legend-label {
    width: 100%;
  }
  .stay-node {
    background-color: skyblue;
  }
  .travel-route-container {
    display: flex;
    flex-wrap: wrap;
    margin: 1.2rem auto;
    align-items: center;
    row-gap: 2rem;
    justify-content: center;
  }
  .route-item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .route-node {
    border: 2px solid #777;
    border-radius: 3px;
    padding: 0.2rem 0.6rem;
    height: fit-content;
    @media (max-width: 1024px) {
      padding: 0.2rem 0.2rem;
      font-size: 80%;
    }
  }
  .primary-node {
    padding: 0.8rem 1rem;
    @media (max-width: 1024px) {
      padding: 0.5rem 0.7rem;
      font-size: inherit;
    }
  }
  .edge {
    /* heihgt: 2px; */
    height: 0;
    min-width: 1rem;
    /* background-color: #777; */
    border: 1px solid #777;
    @media (max-width: 1024px) {
      min-width: 0.8rem;
    }
  }
  .edge.short {
    min-width: 0.4rem;
  }
  .transportation-label {
    border: 2px solid #777;
    border-bottom: 0;
    padding: 0.2rem 0.2rem;
    height: 50%;
    font-size: 75%;
    transform: translateY(calc(-50% + 1px));
    @media (max-width: 1024px) {
      font-size: 65%;
    }
  }
  .dot-spacer {
    border: 0;
    width: 2px;
    height: 0;
  }
  .dashed {
    border-style: dashed;
  }
</style>
