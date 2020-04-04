<script>
  let name = 'world';

  function handleInput(e) {
    name = e.target.value
  }
</script>

<main>
	<h3>svelte</h3>

	<div>Hello {name}!</div>

	<input type="text" on:input={handleInput} />
</main>

<style>
  h3 {
    color: rebeccapurple;
  }
</style>
