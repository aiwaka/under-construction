<script lang="ts">
  import { base } from "$app/paths";

  const cssPath = `${base}/main.css`;
</script>

<!-- layoutを使っているが現状意味があまりない. 複数ページになったときのため残す -->
<svelte:head>
  <link rel="stylesheet" href={cssPath} />
</svelte:head>

<slot />
