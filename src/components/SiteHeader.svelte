<script lang="ts">
  import PageLink from "@components/PageLink.svelte";

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

<style>
  #website-header {
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: 8rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(36, 30, 90, 0.8);
    backdrop-filter: blur(1rem);
    border-bottom: 2px solid darkslateblue;
  }
  @media (max-width: 1024px) {
    #website-header {
      flex-direction: column;
      height: calc(8rem + 3rem);
      border-bottom: 2px solid slateblue;
    }
  }

  #website-header .title-block {
    display: flex;
    margin: 0.2rem 2rem;
    font-family: "Noto Serif JP", serif;
  }
  @media (max-width: 1024px) {
    #website-header .title-block {
      margin: 0 2rem;
    }
  }
  /* #website-header .logo {
    object-fit: scale-down;
    height: 5rem;
    width: 5rem;
    margin: 1.5rem 2.1rem;
    @media (max-width: 1024px) {
      #website-header .logo {
        height: 3rem;
      }
    }
  } */
  #website-header .title {
    color: azure;
    font-size: 3.6rem;
    line-height: 8rem;
    font-weight: bold;
  }
  @media (max-width: 1024px) {
    #website-header .title {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 1024px) {
    nav {
      scrollbar-width: none;
    }
  }
  nav .nav-link-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 1.4rem;
    margin-right: 3.4rem;
    width: fit-content;
  }
  @media (max-width: 1024px) {
    nav .nav-link-wrapper {
      position: relative;
      /* top: 0; */
      bottom: 0;
      height: 3rem;
    }
  }
</style>
