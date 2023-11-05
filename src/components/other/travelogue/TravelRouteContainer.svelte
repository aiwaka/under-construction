<script lang="ts">
  import type { TravelRouteEntry } from "@lib/other/station-collections";
  import { dateText, timeText } from "@lib/utils";

  export let routeData: TravelRouteEntry;

  type RouteSchema = (typeof routeData.route)[number];

  const getTimeText = (datetime: Date) => {
    const text = timeText(datetime);
    if (datetime.getUTCSeconds() === 0 && text === "00:00") {
      return "";
    }
    return text;
  };
  /** 宿泊地かどうか判定. 出発と到着の日付が違っていれば宿泊地とする */
  const isStayNode = (route: RouteSchema) => {
    if (route.departureTime === undefined) return false;
    const arr = route.arrivalTime;
    const dep = route.departureTime;
    // yamlからのDateはUTCと解釈されるのでUTC付きメソッドで取得しなければ+9時間されてずれる.
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

  // 時刻の整合性をチェック（巻き戻っていた場合警告）
  /** 日付が変わるノードのインデックスを記憶する */
  const dateChangeNodeIndexList: number[] = [];
  let beforeTime = new Date(0);
  for (const [i, routeNode] of routeData.route.entries()) {
    const arrivalTime = routeNode.arrivalTime;
    const departureTime = routeNode.departureTime;
    if (
      arrivalTime < beforeTime ||
      (departureTime && departureTime < arrivalTime)
    ) {
      console.warn(
        `${routeNode.name}（${
          i + 1
        }番目のノード）で経路上の時刻が逆行しています。`,
      );
    }
    // 出発到着の日付が異なるか, 前回の時刻と到着時刻の日付が異なる場合はリストに追加
    if (
      (departureTime !== undefined &&
        dateText(departureTime) !== dateText(arrivalTime)) ||
      dateText(beforeTime) !== dateText(arrivalTime)
    ) {
      dateChangeNodeIndexList.push(i);
    }
    beforeTime = new Date(
      JSON.parse(JSON.stringify(departureTime ?? arrivalTime)),
    );
  }
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
        <div class="name-block">
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
        {#if dateChangeNodeIndexList.includes(i) || getTimeText(route.arrivalTime).length}
          {@const arrivalTimeText = getTimeText(route.arrivalTime)}
          <div class="datetime-block">
            {#if dateChangeNodeIndexList.includes(i)}
              <div class="next-date">
                <span>
                  {route.departureTime
                    ? dateText(route.departureTime)
                    : dateText(route.arrivalTime)}
                </span>
              </div>
            {/if}
            {#if arrivalTimeText.length > 0}
              <div class="time-block">
                <div class="arrival-time">
                  {arrivalTimeText}
                </div>
                {#if route.departureTime}
                  <span class="time-spacer">|</span>
                  <div class="departure-time">
                    {getTimeText(route.departureTime)}
                  </div>
                {/if}
              </div>
            {/if}
          </div>
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
    display: grid;
    place-content: center;
    grid-column: 1fr;
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
  .name-block {
    display: flex;
    justify-content: center;
  }
  .datetime-block {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .next-date {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 80%;
  }
  .time-block {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    font-size: 67%;
  }
  .time-spacer {
    margin: auto 0.1rem;
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
