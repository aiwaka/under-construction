<script lang="ts">
  import PageLink from "@/PageLink.svelte";
</script>

<div id="website-header">
  <div class="title-block">
    <h1 class="title">
      <a href="/">Profile Page</a>
    </h1>
  </div>
  <nav>
    <div class="nav-link-wrapper">
      <PageLink href="/">Home</PageLink>
      <PageLink href="/about">About</PageLink>
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
    position: sticky;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3rem);
  }
  @media (max-width: 1024px) {
    #website-header {
      flex-direction: column;
      height: 11rem;
      /* border-bottom: 1px solid #888; */
    }
  }

  #website-header .title-block {
    display: flex;
    margin: 0.2rem 2rem;
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
    font-family: "Noto Serif JP", serif;
    font-size: 5rem;
    line-height: 8rem;
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
