<script>
  import { spring, tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  let coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.05,
      damping: 0.3
    }
  );

  let scale = spring(10);
  let opacity = tweened(0, { easing: cubicOut });

  const move = e => {
    coords.set({ x: e.offsetX, y: e.offsetY });
  };

  const enter = () => {
    scale.set(3);
    $opacity = 1;
  };

  const leave = () => {
    scale.set(10);
    $opacity = 0;
  };
</script>

<style>
  div.circle {
    pointer-events: none;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    margin: -25px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  div {
    position: relative;
    overflow: hidden;

    width: 100%;
    height: 150px;

    background-color: #eee;
    border-radius: 16px;
  }
</style>

<div on:mousemove={move} on:mouseenter={enter} on:mouseleave={leave}>
  <div
    class="circle"
    style="opacity: {$opacity}; transform: translate({$coords.x}px, {$coords.y}px) scale({$scale});"
  />
</div>
