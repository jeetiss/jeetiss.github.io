import GAnalytics from 'ganalytics'
import { css } from 'linaria'
import { insertAfter } from './html'

GAnalytics('UA-126675501-1')

const box = document.querySelector('.js-exps')

const experimens = [
  // () => import('./audio'),
  () => import('./animation'),
  () => import('./svelte'),
  () => import('./preact'),
  () => import('./covid'),
  () => import('./loader'),
  () => import('./sockets'),
  () => import('./link')
]

experimens.reduce(
  (promise, moduleCreator) =>
    promise
      .then(node => Promise.all([moduleCreator(), node]))
      .then(([{ default: createModule }, node]) => {
        const moduleNode = createModule()
        insertAfter(moduleNode, node)
        return moduleNode
      }),
  Promise.resolve(box)
)

css`
  :global() {
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
      margin: 0;
    }

    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }

    body {
      display: grid;
      grid-template-rows: 1fr min-content;
      grid-template-columns: repeat(3, minmax(auto, 400px));
      grid-auto-flow: row dense;
      grid-gap: 24px;

      justify-content: center;

      padding: 24px 24px 48px;
      color: black;
    }

    @media (max-width: 900px) {
      body {
        grid-template-columns: repeat(2, minmax(auto, 400px));
      }
    }

    @media (max-width: 600px) {
      body {
        grid-template-columns: minmax(auto, 400px);
      }
    }

    .full-width {
      grid-column: 1 / -1;
    }

    main > img {
      width: 260px;
      height: 260px;

      border-radius: 3px;
    }

    /* --- reset list --- */
    ul.reset,
    ul.reset li,
    ul.reset ul li {
      margin: 0;
      padding: 0;
      text-indent: 0;
      list-style-type: none;
    }
    /* --- reset list --- */

    .contacts > li {
      display: inline;
    }

    .contacts > li > a {
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
  }
`
