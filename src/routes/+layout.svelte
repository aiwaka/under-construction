<script lang="ts">
  import SiteHeader from "./SiteHeader.svelte";
</script>

<SiteHeader />
<slot />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Serif+JP&display=swap");

  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: relative;
    font-weight: normal;
  }
  :global(html) {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    word-break: normal;
    -moz-tab-size: 4;
    tab-size: 4;
    font-size: 62.5%; /* ルートのフォントサイズを10pxとしてremで指定できるようにする */
  }
  @media (max-width: 375px) {
    :global(html) {
      font-size: 2.66vw; /* 10/375*100 */
    }
  }

  /* Set core body defaults */
  :global(body) {
    min-height: 100vh;
    color: #222;
    background: antiquewhite;
    transition: color 0.5s, background-color 0.5s;
    line-height: 1.6;
    /* font-family: 'Noto Serif JP', serif; */
    font-size: 1.5em; /* 14px. Chromeのバグ対策でここだけemを使うらしいがもう治ったかも */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  /* モバイルでも崩れない背景設定のためこのような手法を取る */
  :global(body::before) {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -50;
    width: 100%;
    height: 100vh;
    background-image: url("img/blue_2.png");
    background-repeat: no-repeat;
    background-position: center 70%;
    background-size: cover;
  }
  :global(ul[class], ol[class]) {
    list-style: none;
  }
  /* A elements that don't have a class get default styles */
  :global(a:not([class])) {
    text-decoration-skip-ink: auto;
  }
  :global(a) {
    color: inherit;
    text-decoration: none;
  }
  /* Make images easier to work with */
  :global(img, picture) {
    max-width: 100%;
    display: block;
  }
  :global(input, button, textarea, select) {
    font: inherit;
  }
  :global(img:not([alt])) {
    filter: blur(10px);
  }

  :global(#app) {
    position: relative;
    /* height: fit-content; */
    min-height: 100vh;
    margin: 0 auto;
    font-weight: normal;
  }
</style>
