<script>
  import { createHandler, resize } from "./resize";

  const [size, handler] = createHandler({})
</script>

<style>
  div {
    position: relative;
    width: 100%;
    height: 100%;

    min-height: 48px;
  }

  div.style {
    width: 100%;
    height: 100%;

    border: 1px dashed #d4d4d4;
  }

  span {
    position: absolute;

    right: 10px;
    bottom: 10px;

    color: #b4b4b4;
    font-family: monospace;
    font-size: 14px;
  }
</style>

<div use:resize on:resize={handler}>
  <div class="style">
    <span>{$size.width}x{$size.height}</span>
  </div>
</div>
