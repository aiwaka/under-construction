<script lang="ts">
  import PageLink from "@components/PageLink.svelte";
  import "@fontsource/noto-serif-jp";

  interface NavLink {
    name: string;
    href: string;
  }
  // 表示名とリンクを並べる
  const navLinkList: NavLink[] = [
    { name: "PROFILE", href: "/#profile" },
    { name: "SKILL", href: "/#skill" },
    { name: "WORKS", href: "/#works" },
    { name: "CONTACT", href: "/#contact" },
    { name: "BLOG", href: "/blog" },
  ];

  export let currentRoute: string;
</script>

<div id="website-header">
  <div class="title-block">
    <h1 class="title">
      <a href="/">UNDER CONSTRUCTION</a>
    </h1>
  </div>
  <nav>
    <div class="nav-link-wrapper">
      {#each navLinkList as navLink}
        <PageLink {currentRoute} href={import.meta.env.BASE_URL + navLink.href}>
          {navLink.name}
        </PageLink>
      {/each}
    </div>
  </nav>
</div>

<style lang="postcss">
  #website-header {
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: var(--header-height);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: var(--main-color);
    backdrop-filter: blur(1rem);
    @media (max-width: 1024px) {
      flex-direction: column;
      height: calc(var(--header-height) + 3rem);
      border-bottom: 2px solid var(--main-color);
    }
  }

  #website-header .title-block {
    display: flex;
    margin: 0rem 2rem;
  }
  #website-header .title {
    margin: 0;
    color: var(--main-bg-color);
    font-size: 2.2rem;
    line-height: var(--header-height);
    font-family: "Noto Serif JP", serif;
    /* font-weight: 400; */
    @media (max-width: 1024px) {
      font-size: 2.2rem;
    }
  }

  nav .nav-link-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 2.4rem;
    width: fit-content;
    height: 100%;
    @media (max-width: 1024px) {
      position: relative;
      bottom: 0;
      height: 3rem;
    }
  }
</style>
