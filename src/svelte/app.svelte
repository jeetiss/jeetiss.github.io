<script context="module">
  import { getFileUrl } from "../get-url.js";

  export const url = getFileUrl();
</script>

<script>
  let count = 0;
  function handleInput(e) {
    name = e.target.value;
  }
</script>

<button on:click={() => (count -= 1)}>dec</button>

<span>{count}</span>

<button on:click={() => (count += 1)}>inc</button>
