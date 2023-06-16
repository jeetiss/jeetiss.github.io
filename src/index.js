import { stylesheet } from "astroturf";
import { replaceNode, insertAfter, html } from "./html.js";

import "./index.css.js";

const box = document.querySelector(".js-exps");

const experiments = [
  [() => import("./leader.js"), 140, "leader"],
  [() => import("./noise.js"), 140, "noise"],
  [() => import("./crop/index.js"), 225, "crop"],
  [() => import("./audio/index.js"), 140, "audio message"],
  [() => import("./resize-observer/index.js"), 48, "size"],
  [() => import("./show-videocard.js"), 100, "videocard"],
  [() => import("./lit-element/index.js"), 120, "lit-element counter"],
  [() => import("./preact/index.js"), 120, "preact counter"],
  [() => import("./svelte/index.js"), 120, "svelte counter"],
  [() => import("./file-icon.js"), 170, "file icon"],
  [() => import("./animation/index.js"), 200, "filepond haver animation"],
  [() => import("./covid.js"), 330, "covid chart"],
  [() => import("./loader.js"), 150, "dot loader"],
  [() => import("./sockets.js"), 100, "sockets"],
  [() => import("./link.js"), 200, "link with hover"],
];

const placeholder = (importee, height, name) => {
  const node = html`<div style="min-height: ${height}px; height: 100%"></div>`;

  const load = () =>
    importee().then(({ default: createModule }) => {
      replaceNode(node, createModule());
    });

  return { node, load };
};

const phs = experiments
  .slice(0)
  .reverse()
  .map((args) => placeholder(...args));

phs.forEach((placeholder, index) => {
  placeholder.node.setAttribute("index", index);
  insertAfter(placeholder.node, box);
});

const observer = new window.IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = entry.target.getAttribute("index");
      observer.unobserve(phs[index].node);

      setTimeout(() => {
        phs[index].load();
      });
    }
  });
});

phs.forEach((placeholder) => {
  observer.observe(placeholder.node);
});

stylesheet`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
  }

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    display: grid;
    grid-template-rows: 1fr min-content;
    grid-template-columns: repeat(3, minmax(auto, 400px));
    grid-auto-flow: row dense;
    grid-gap: 96px;

    justify-content: center;

    padding: 24px 24px 48px;
    color: black;
  }

  @media (max-width: 1100px) {
    body {
      grid-template-columns: repeat(2, minmax(auto, 400px));
    }
  }

  @media (max-width: 900px) {
    body {
      grid-template-columns: minmax(300px, 500px);
      grid-gap: 24px;
      padding: 10px;
    }
  }

  :global(.full-width) {
    grid-column: 1 / -1;
  }

  main > img {
    width: 260px;
    height: 260px;

    border-radius: 3px;
  }

  /* --- reset list --- */
  :global(ul.reset,
  ul.reset li,
  ul.reset ul li) {
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
  }
  /* --- reset list --- */

  :global(.contacts > li) {
    display: inline;
  }

  :global(.contacts > li > a) {
    margin-right: 8px;
  }

  a {
    --base-hover: rgb(233, 235, 255);
    color: inherit;

    border-radius: 1px;
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-position: center bottom 1%;
    background-origin: initial;
    background-size: 100% 1px;
    outline: none;

    transition: color 0.2s ease, background-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  a:hover {
    color: black;
    background-color: var(--base-hover);
    box-shadow: 0 0 0 4px var(--base-hover);
  }

  h1 {
    max-width: 700px;
    line-height: 42px;

    margin: 42px 0;
  }
`;
