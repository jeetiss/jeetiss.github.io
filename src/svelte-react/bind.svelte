<script>
  import { createEventDispatcher } from "svelte";

  export let value = 0;

  const dispatch = createEventDispatcher();

  const handleChange = e => {
    value = e.target.value;
    dispatch("change", { value });
  };
</script>

<style>
  .svelte {
    padding: 10px;
    border: 1px solid wheat;
  }
</style>

<div class="svelte">
  <div>svelte:</div>
  <p>
    <input type="text" {value} on:input={handleChange} />
  </p>
  {value}
  <slot />
</div>
