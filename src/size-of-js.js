import { html } from './html.js'
import { css } from 'astroturf'

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

export default (importer, name) => {
  const node = html`<div class="${sizer}">
    <div class="${info}">
      <span>framework</span>
      <span>size</span>
    </div>

    <div class="${titleStyle}">
      <span class="${nameStyle}">${name}</span>
      <span class="js-size">🤷🏻‍♂️</span>
    </div>
  </div>`

  importer().then(({ default: createModule }) => {
    node.append(createModule())
  })

  return node
}
