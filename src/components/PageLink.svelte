<script lang="ts">
  export let currentRoute: string;
  export let href: string;
  export let shrinkable: boolean;
  export let height = "6rem";
  export let mobileHeight = "var(--mobile-nav-height)";

  $: shrink = false;
  $: if (window && shrinkable) {
    shrink = window.innerWidth < 1024;
  }
  $: resultHeight = shrink ? mobileHeight : height;
  $: isCurrentPage = currentRoute === href;
</script>

<div class="page-link__container">
  <a
    class:current-page={isCurrentPage}
    class="page-link"
    style:line-height={resultHeight}
    {href}
  >
    <slot />
  </a>
</div>

<style lang="postcss">
  .page-link {
    transition: 0.25s ease-in-out;
    display: block;
    position: relative;
    margin: 0 0.6rem;
    font-size: 1.4rem;
    color: var(--main-bg-color);
    @media (max-width: 1024px) {
      font-size: min(4vw, 1.2rem);
    }
  }

  .page-link:hover {
    color: rgb(172, 255, 244);
  }

  .page-link::before {
    content: "";
    width: 0;
    height: 0.1rem;
    background: rgb(172, 255, 244);
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: 0.25s ease-out;
  }

  .page-link:hover::before {
    width: 100%;
  }

  .page-link.current-page {
    color: rgb(172, 255, 244);
  }
  .page-link.current-page::before {
    width: 100%;
    background: rgb(100, 200, 255);
  }
</style>
