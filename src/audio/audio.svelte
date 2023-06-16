<script>
  import { onMount } from "svelte";
  import { writable, readable  } from "svelte/store";
  import { createMachine, assign } from "@xstate/fsm";
  import { useMachine } from "xstate-svelte/dist/fsm";

  import { createHandler, resize } from "../resize-observer/resize.js";
  import { generateWave } from "./generate-wave.js";

  import file from "./hello.m4a";

  const [size, handler] = createHandler({});

  const raf = readable(0, set => {
    let id;
    const spam = dt => {
      set(dt);
      id = window.requestAnimationFrame(spam);
    };

    spam(0);

    return () => window.cancelAnimationFrame(id);
  });
  let unsubscribe = () => undefined;
  const duration = writable("0%");
  let wave = {};

  const playerMachine = createMachine({
    id: "player",
    initial: "start",
    context: {
      context: new (window.AudioContext || window.webkitAudioContext)(),
      audioBuffer: undefined,
      source: undefined,
      unsubscribe: undefined
    },
    states: {
      start: {
        on: { FETCH: "loading" }
      },
      loading: {
        entry: ["load"],
        on: {
          RESOLVE: {
            target: "idle",
            actions: assign((context, event) => ({
              ...context,
              audioBuffer: event.audioBuffer
            }))
          }
        }
      },
      idle: {
        entry: ["initStream"],
        on: {
          TOGGLE: {
            target: "play"
          }
        }
      },
      pause: {
        entry: ["pause"],
        on: {
          TOGGLE: {
            target: "play"
          }
        }
      },
      play: {
        entry: ["play", "subOnEnd"],
        exit: ["unsubOnEnd"],
        on: {
          TOGGLE: {
            target: "pause"
          }
        }
      }
    }
  });

  const promisify = fn => (...args) =>
    new Promise((resolve, reject) => {
      Reflect.apply(fn, undefined, [
        ...args,
        result => resolve(result),
        error => reject(error)
      ]);
    });

  const { state, send } = useMachine(playerMachine, {
    actions: {
      load: ({ context }) => {
        const decodeAudioData = promisify(
          context.decodeAudioData.bind(context)
        );

        window
          .fetch(new window.Request(file))
          .then(response => response.arrayBuffer())
          .then(buffer => decodeAudioData(buffer))
          .then(audioBuffer => ({ audioBuffer }))
          .then(({ audioBuffer }) => {
            size.subscribe(({ width, height }) => {
              if (width && height) {
                wave = generateWave(audioBuffer, {
                  width,
                  height
                });
              }
            });

            send({ type: "RESOLVE", audioBuffer });
          });
      },
      initStream: ({ audioBuffer }) => {
        console.log("ready 💪🏻");
      },
      pause: assign(ctx => {
        const { source, context } = ctx;
        source.disconnect(context.destination);
        source.stop();

        unsubscribe();

        return { ...ctx, source: undefined };
      }),
      play: assign(ctx => {
        const { audioBuffer, context } = ctx;
        const source = context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(context.destination);
        source.start(0, 0);

        const startedAt = context.currentTime;
        unsubscribe = raf.subscribe(() => {
          const dur =
            ((context.currentTime - startedAt) / audioBuffer.duration) * 100;

          duration.set(`${dur.toFixed(2)}%`);
        });

        return { ...ctx, source };
      }),
      subOnEnd: assign(ctx => {
        const { source } = ctx;
        const handler = () => send({ type: "TOGGLE" });
        const unsubscribe = () => source.removeEventListener("ended", handler);

        source.addEventListener("ended", handler);

        return { ...ctx, unsubscribe };
      }),
      unsubOnEnd: ({ unsubscribe }) => {
        if (unsubscribe) {
          unsubscribe();
        }
      }
    }
  });

  onMount(() => {
    send("FETCH");
  });
</script>

<style>
  .example {
    display: flex;
    flex-direction: column;
  }

  .example > span {
    color: #474747;
    font-family: monospace;
    padding-bottom: 6px;
  }

  .container {
    --height: 100px;

    display: flex;
    position: relative;

    height: var(--height);
    width: 100%;

    background-color: #ededed;
    border-radius: 24px;
  }

  button {
    display: block;
    box-sizing: border-box;

    margin: 15px 20px;
    padding: 0px;

    background-color: transparent;
    color: white;

    border: none;
    outline: none;
  }

  .bars {
    width: 100%;
    position: relative;
    height: calc(100% - 30px);

    margin: 15px 20px 15px 0;
  }

  .bars svg {
    height: 100%;
    width: 100%;
    stroke-width: 5px;
    stroke-linecap: round;
  }

  .bars > svg {
    stroke: #c7c7c7;
  }

  .bars > div {
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    clip-path: polygon(0 0, var(--dur) 0, var(--dur) 100%, 0% 100%);
    -webkit-clip-path: polygon(0 0, var(--dur) 0, var(--dur) 100%, 0% 100%);
  }

  .bars > div > svg {
    stroke: #6360ff;
  }

  .loading {
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #ededed;
    border-radius: 24px;
  }

  .debug {
    padding-top: 6px;
    align-self: flex-end;

    color: #474747;
    font-family: monospace;
    z-index: 1;
  }
</style>

<div class="example">
  <span>WARNING: russian speech</span>
  <div class="container">
    <button on:click={() => send('TOGGLE')}>
      {#if $state.matches('play')}
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="35" fill="#6360FF" />
          <rect x="39" y="20" width="9" height="30" rx="4.5" fill="#EDEDED" />
          <rect x="22" y="20" width="9" height="30" rx="4.5" fill="#EDEDED" />
        </svg>
      {:else}
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="35" fill="#6360FF" />
          <path
            d="M49 31.54a4 4 0 010 6.92l-18 10.4a4 4 0 01-6-3.47V24.61a4 4 0
            016-3.47l18 10.4z"
            fill="#EDEDED" />
        </svg>
      {/if}
    </button>

    <div use:resize on:resize={handler} class="bars">
      <svg viewBox={wave.box}>
        <path d={wave.d} />
      </svg>

      <div style="--dur: {$duration}">
        <svg viewBox={wave.box}>
          <path d={wave.d} />
        </svg>
      </div>
    </div>

    {#if $state.matches('start') || $state.matches('loading')}
      <div class="loading" />
    {/if}
  </div>
  <div class="debug">{$duration} | {$size.width}x{$size.height}</div>
</div>
