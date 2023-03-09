<script lang="ts">
  export let href: string;
  export let highlight: boolean = false;
</script>

<a class:current-page={highlight} class="page-link" {href}>
  <slot />
</a>

<style lang="postcss">
  .page-link {
    transition: 0.25s ease-in-out;
    display: block;
    position: relative;
    margin: 0 0.6rem;
    line-height: inherit;
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
