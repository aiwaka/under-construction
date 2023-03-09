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
  <AnimatedLink
    href={`${import.meta.env.BASE_URL}${href}`}
    highlight={isCurrentPage}
  >
    <slot />
  </AnimatedLink>
</div>
