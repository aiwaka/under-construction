<script lang="ts">
  export let trackId: number;
</script>

<div class="soundcloud-track">
  <iframe
    title="soundcloud-track"
    width="100%"
    height="auto"
    scrolling="no"
    frameborder="0"
    allow="autoplay"
    loading="lazy"
    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=true&show_teaser=false&visual=true&sharing=true`}
  />
</div>

<style>
  .soundcloud-track > iframe {
    border: 1px solid #888;
  }
</style>
