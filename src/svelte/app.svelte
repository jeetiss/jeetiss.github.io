<script>
  let count = 0;
  function handleInput(e) {
    name = e.target.value;
  }
</script>

<button on:click={() => (count -= 1)}>dec</button>

<span>{count}</span>

<button on:click={() => (count += 1)}>inc</button>
