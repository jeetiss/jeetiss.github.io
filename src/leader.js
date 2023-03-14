import { createMachine, interpret } from "xstate";
import nanoid from "nanoid";
import { html, removeNode } from "./html.js";
import { css } from "astroturf";

const config = {
  id: "le-2",
  initial: "idle",
  states: {
    idle: {
      entry: "sendPing",
      on: {
        ping: {
          target: "wait",
        },
      },
    },
    wait: {
      after: {
        500: {
          target: "#le-2.leader",
          actions: [],
          internal: false,
        },
      },
      on: {
        pong: {
          target: "follower",
        },
      },
    },
    follower: {
      after: {
        3000: {
          target: "#le-2.leader",
          actions: [],
          internal: false,
        },
      },
      on: {
        pong: {
          target: "follower",
          internal: false,
        },
      },
    },
    leader: {
      entry: "sendPong",
      after: {
        2000: {
          target: "#le-2.leader",
          actions: [],
          internal: false,
        },
      },
      on: {
        pong: [
          {
            target: "follower",
            cond: "idIsLess",
          },
          {
            target: "leader",
            cond: "idIsBigger",
            internal: false,
          },
        ],
        ping: {
          target: "leader",
          internal: false,
        },
      },
    },
  },
  context: { id: nanoid(10) },
  predictableActionArguments: true,
  preserveActionOrder: true,
};

const voter = css`
  display: flex;
  align-items: center;
  gap: 2px;
  width: 110px;
  cursor: default;

  color: white;

  background-color: var(--background-color);
  border-radius: 20px;
  padding: 5px;

  & > span {
    font-family: monospace;
    padding: 2px 6px;
    flex: 1 1;
  }

  & > button {
    border: none;
    background-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > button:hover {
    cursor: pointer;
  }

  & > button > span {
    display: block;
    color: var(--background-color);
    font-weight: 900;
    font-size: 15px;
    transform: rotate(45deg);
  }
`;

const createVoter = () => {
  const node = html`<div class="${voter} js-voter">
    <span class="js-state">initial</span><button><span>+</span></button>
  </div>`;
  const voterElement = node;
  const stateElement = node.querySelector(".js-state");
  const buttonElement = node.querySelector("button");

  const writeChannel = new BroadcastChannel("_l_o_l_");
  const readChannel = new BroadcastChannel("_l_o_l_");
  const electionMachine = createMachine(config, {
    actions: {
      sendPing: (context) => {
        writeChannel.postMessage({ type: "ping", sender: context.id });
      },
      sendPong: (context) => {
        writeChannel.postMessage({ type: "pong", sender: context.id });
      },
    },
    guards: {
      idIsLess: (context, event) => {
        return event.sender > context.id;
      },
      idIsBigger: (context, event) => {
        return event.sender < context.id;
      },
    },
  });

  const electionService = interpret(
    electionMachine.withContext({ id: nanoid(10) })
  ).onTransition((state) => {
    stateElement.textContent = state.value;
    voterElement.style.setProperty(
      "--background-color",
      (() => {
        switch (state.value) {
          case "leader":
            return "hsl(0deg 16% 45%)";

          case "follower":
            return "hsl(120deg 16% 45%)";

          default:
            return "#e2e2e2";
        }
      })()
    );
  });
  electionService.start();

  readChannel.addEventListener("message", (event) => {
    const { type, sender } = event.data;
    electionService.send({ type, sender });
  });

  buttonElement.addEventListener("click", () => {
    electionService.stop();
    writeChannel.close();
    readChannel.close();
    removeNode(node);
  });

  return node;
};

const voters = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
  height: 100%;
`;

const block = css`
  width: 100%;
  min-height: 100px;
`;

export default () => {
  const node = html`<div class="full-width ${block}">
    <div class="${voters} js-voters"></div>
    <button>add</button>
  </div>`;
  const votersElement = node.querySelector(".js-voters");
  const buttonElement = node.querySelector("button");

  buttonElement.addEventListener("click", () => {
    votersElement.append(createVoter());
  });

  votersElement.append(createVoter());
  votersElement.append(createVoter());
  votersElement.append(createVoter());

  return node;
};
