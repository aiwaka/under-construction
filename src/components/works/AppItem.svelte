<script lang="ts">
  import type { AllowedName } from "@lib/profile/allowdServiceName";
  import ServiceIconList from "@components/works/ServiceIconList.svelte";

  export let langList: AllowedName[];
  export let href: string;
</script>

<div class="app-item">
  <div class="app-title-row">
    <h3 class="app-title">
      {#if href !== ""}
        <a {href} target="_blank" rel="noopener noreferrer">
          <slot name="title" />
        </a>
      {:else}
        <slot name="title" />
      {/if}
    </h3>
  </div>

  <div class="contents-container">
    <div class="contents">
      <ServiceIconList {langList} />

      <div class="work-period">
        開発期間：
        <slot name="work-period" />
      </div>
      <slot />
    </div>
  </div>
</div>

<style>
  .app-item {
    padding: 0.8rem 1.2rem;
    margin: 2rem auto;
    border-left: 2px double gray;
  }
  .app-title-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid gray;
  }
  .app-title-row .app-title {
    flex-grow: 1;
  }
  .work-period {
    margin: 1rem auto;
  }
</style>
