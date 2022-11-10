<script lang="ts">
  import SiteFooter from "@/SiteFooter.svelte";
  import SiteHeader from "@/SiteHeader.svelte";
</script>

<svelte:head>
  <link rel="stylesheet" href="main.css" />
</svelte:head>

<SiteHeader />
<slot />
<SiteFooter />
