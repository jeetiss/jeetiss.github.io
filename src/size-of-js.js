import prettyBytes from 'pretty-bytes'
import { html } from './html'
import { css } from 'linaria'

const { fetch } = window

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

const uniq = (arr) => [...new Set(arr)]

const fetchFile = (names) =>
  Promise.all(
    uniq(names).map((name) =>
      fetch(name)
        .then((response) => response.blob())
        .then((blob) => blob.size)
    )
  )
    .then((sizes) => sizes.reduce((sum, next) => sum + next, 0))
    .then((size) => prettyBytes(size))

export default (importer, files, name) => {
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
  const contentel = node

  fetchFile(files).then((size) => {
    sizeel.textContent = size
  }).catch(() => {
    sizeel.textContent = '🤷🏻‍♂️'
  })

  importer().then(({ default: createModule }) => {
    contentel.append(createModule())
  })

  return node
}
