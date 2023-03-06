<script lang="ts">
  import AnimatedLink from "./utils/AnimatedLink.svelte";

  export let currentRoute: string;
  export let href: string;

  $: shrink = false;
  $: if (window) {
    shrink = window.innerWidth < 1024;
  }
  $: resultHeight = shrink ? "var(--mobile-nav-height)" : "6rem";
  $: isCurrentPage = currentRoute === href;
</script>

<div
  style:height={resultHeight}
  style:line-height={resultHeight}
  class="page-link__container"
>
  <AnimatedLink {href} highlight={isCurrentPage}>
    <slot />
  </AnimatedLink>
</div>

<!-- <div class="page-link__container">
  <a
    class:current-page={isCurrentPage}
    class="page-link"
    style:line-height={resultHeight}
    {href}
  >
    <slot />
  </a>
</div> -->
