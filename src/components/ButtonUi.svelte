<script lang="ts">
  export let clickCallback: () => void;
  export let disabled = false;
</script>

<button class="button-ui" {disabled} on:click={clickCallback}>
  <slot />
</button>

<style>
  .button-ui {
    margin: 0.3rem 0.5rem;
    padding: 0.3rem 1.5rem;
    border: 1px solid rgb(100, 200, 255);
    border-radius: 12px;
    transition: 0.25s ease-out;
  }
  .button-ui[disabled] {
    color: #999999;
  }
  .button-ui:not([disabled]):hover {
    color: #333333;
    background-color: rgb(100, 200, 255);
    border: 1px solid rgb(172, 255, 244);
  }
</style>
