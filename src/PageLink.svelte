<script lang="ts">
  import { page } from "$app/stores";
  export let href: string;

  $: activePage = $page.route.id === href;
  $: linkClass = "page-link " + (activePage ? "current-page" : "");
</script>

<div class="page-link__container">
  <a class={linkClass} {href}>
    <slot />
  </a>
</div>

<style>
  .page-link {
    transition: 0.25s ease-in-out;
    display: block;
    position: relative;
    margin: 0 1rem;
    font-size: 1.8rem;
    line-height: 8rem;
  }
  @media (max-width: 1024px) {
    .page-link {
      font-size: 1.4rem;
      line-height: 3rem;
    }
  }

  .page-link:hover {
    color: rgb(172, 255, 244);
  }

  .page-link::before {
    content: "";
    width: 0;
    height: 0.2rem;
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
