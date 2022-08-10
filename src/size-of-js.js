import prettyBytes from 'pretty-bytes'
import { css } from 'astroturf'

import { html } from './html.js'

const sizer = css`
  & {
    display: flex;
    flex-direction: column;
  }

  & > div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    min-height: 80px;
  }

  & > div:nth-child(3) > * {
    padding: 4px 8px;
  }
`

const nameStyle = css`
  &::first-letter {
    text-transform: uppercase;
  }
`

const info = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 12px;
  color: #aaa;
`

const titleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 24px;
`

const fetchFile = (name) =>
  fetch(name)
    .then((response) => response.blob())
    .then((blob) => blob.size)
    .then((size) => prettyBytes(size))

export default (importer, bundle, name) => {
  const node = html`<div class="${sizer}">
    <div class="${info}">
      <span>framework</span>
      <span>size</span>
    </div>

    <div class="${titleStyle}">
      <span class="${nameStyle}">${name}</span>
      <span class="js-size"></span>
    </div>
  </div>`

  const sizeel = node.querySelector('.js-size')

  fetchFile(bundle)
    .then((size) => {
      sizeel.textContent = size
    })
    .catch(() => {
      sizeel.textContent = '🤷🏻‍♂️'
    })

  importer().then(({ default: createModule }) => {
    node.append(createModule())
  })

  return node
}
