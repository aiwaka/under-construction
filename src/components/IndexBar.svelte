<script lang="ts">
  import PageLink from "./PageLink.svelte";
  import AnimatedLink from "./utils/AnimatedLink.svelte";

  interface IndexData {
    name: string;
    href: string;
  }
  export let indexList: IndexData[];
</script>

<div class="contents-link-wrapper">
  {#each indexList as idx}
    {@const href = idx.href}
    <div class="index-link">
      <AnimatedLink {href}>
        {idx.name}
      </AnimatedLink>
    </div>
  {/each}
</div>

<style lang="postcss">
  .contents-link-wrapper {
    display: flex;
    justify-content: space-evenly;
    margin: 3.2rem 1rem;
    background-image: -webkit-linear-gradient(
      left,
      transparent,
      rgba(var(--main-color-params), 0.7) 5%,
      rgba(var(--main-color-params), 0.7) 95%,
      transparent
    );
    background-position: center;
    background-repeat: no-repeat;
    height: 2.2rem;
    line-height: 2.2rem;
  }
  @media (max-width: 1024px) {
    .contents-link-wrapper {
      margin: 2rem 0;
      position: relative;
      bottom: 0;
      height: 1.6rem;
      line-height: 1.6rem;
    }
  }
  .index-link {
    height: 2.2rem;
  }
</style>
