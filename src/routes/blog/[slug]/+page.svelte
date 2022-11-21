<script lang="ts">
  import type { PageData } from "./$types";
  import { base } from "$app/paths";
  import ArticleTag from "@/components/blog/ArticleTag.svelte";

  const bgCssPath = `${base}/style/bg2.css`;
  const blogCssPath = `${base}/style/blog-contents.css`;

  export let data: PageData;

  const { id, description, title, thumbnail, date, tags } = data.post.attr;
  const Content = data.post.body;

  const thumbnailPath = `${base}/blog/thumb/${thumbnail}`;

  const dateText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const ogp = {
    url: `https://littleikawa.github.io/under-construction/blog/${id}/`,
    type: "article",
    title,
    description,
    siteName: "Under Construction",
    // githubでデプロイするとここに保存されているようなのでこのようにする.
    image: `https://littleikawa.github.io/under-construction/blog/thumb/${thumbnail}`
  };
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href={bgCssPath} />
  <link rel="stylesheet" href={blogCssPath} />
  <meta property="og:url" content={ogp.url} />
  <meta property="og:type" content={ogp.type} />
  <meta property="og:title" content={ogp.title} />
  <meta property="og:description" content={ogp.description} />
  <meta property="og:site_name" content={ogp.siteName} />
  <meta property="og:image" content={ogp.image} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="header-margin" />
<main class="main-container">
  <h1>{title}</h1>
  <!-- TODO: 目次を作りたい -->
  <div class="date-block"><span>{dateText}</span></div>
  <div class="tag-container">
    {#each tags as tag}
      <ArticleTag {tag} />
    {/each}
  </div>
  <div class="img-container">
    <img src={thumbnailPath} alt="thumbnail" />
  </div>
  <!-- <svelte:component this={data.post.body} /> -->
  <div class="blog-article-content-container">
    <Content />
  </div>
</main>

<style>
  .header-margin {
    height: 10rem;
  }
  .main-container {
    width: 70%;
    margin: auto;
  }
  @media (max-width: 1024px) {
    .header-margin {
      height: 13rem;
    }
    .main-container {
      width: 85%;
    }
  }

  .img-container {
    border: 4px solid darkslateblue;
    width: 100%;
    height: 40vh;
    clip: rect(0, 0, 0, 0);
    margin: 5rem auto;
  }
  .img-container > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .tag-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
