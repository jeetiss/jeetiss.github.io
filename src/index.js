import { css } from 'linaria'
import { replaceNode, insertAfter, html } from './html'
import { init, track } from './splitbee'

init()

const box = document.querySelector('.js-exps')

const experimens = [
  [() => import('./resize-observer'), 100, 'size'],
  [() => import('./show-videocard'), 100, 'videocard'],
  [() => import('./lit-element'), 120, 'lit-element counter'],
  [() => import('./preact'), 120, 'preact counter'],
  [() => import('./svelte'), 120, 'svelte counter'],
  [() => import('./file-icon'), 170, 'file icon'],
  [() => import('./animation'), 200, 'filepond haver animation'],
  [() => import('./covid'), 330, 'covid chart'],
  [() => import('./loader'), 150, 'dot loader'],
  [() => import('./sockets'), 100, 'sockets'],
  [() => import('./link'), 200, 'link with hover']
]

const placeholder = (importee, height, name) => {
  const node = html`<div style="min-height: ${height}px; height: 100%"></div>`

  const load = () =>
    importee().then(({ default: createModule }) => {
      replaceNode(node, createModule())
      track(`load ${name}`)
    })

  return { node, load }
}

const phs = experimens
  .slice(0)
  .reverse()
  .map((args) => placeholder(...args))

phs.forEach((placeholder, index) => {
  placeholder.node.setAttribute('index', index)
  insertAfter(placeholder.node, box)
})

var observer = new window.IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = entry.target.getAttribute('index')
      observer.unobserve(phs[index].node)

      setTimeout(() => {
        phs[index].load()
      })
    }
  })
})

phs.forEach((placeholder) => {
  observer.observe(placeholder.node)
})

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
