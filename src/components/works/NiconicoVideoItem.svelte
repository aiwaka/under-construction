<script lang="ts">
  export let videoId: number;
</script>

<div class="niconico-video">
  <iframe
    title="niconico-video"
    width="200rem"
    height="auto"
    loading="lazy"
    src={`https://embed.nicovideo.jp/watch/sm${videoId}?oldScript=1&referer=&from=0`}
  />
</div>

<style>
  .niconico-video {
    position: relative;
    margin: 0.4rem 2rem;
  }
  .niconico-video > iframe {
    border: none;
  }
</style>
