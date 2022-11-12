<script lang="ts">
  import { base } from "$app/paths";
</script>

<!-- layoutを使っているが現状意味があまりない. 複数ページになったときのため残す -->
<svelte:head>
  <link rel="stylesheet" href={`${base}/main.css`} />
</svelte:head>

<slot />
