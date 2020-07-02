import nanoid from 'nanoid'
import { channel } from '@brows/client'
import { html, removeNode } from './html'
import { css } from 'linaria'

const bollContainer = css`
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  height: 100px;

  background-color: rgb(126, 178, 255);

  display: flex;
  align-items: center;

  overflow: hidden;

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    display: block;
    width: 100%;
    height: 2px;

    background-color: white;
  }

  & > .name {
    user-select: none;

    font-size: 48px;
    font-weight: 800;
    color: white;
    margin: 20px;

    text-transform: uppercase;
  }
`

const bllcss = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
`

const enemy = css`
  width: 24px;
  height: 24px;
`

const container = css`
  position: absolute;

  top: 0;
  left: 0px;
  right: -48px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  animation: moveboll 5s linear 1;
  z-index: 1;

  @keyframes moveboll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-120%);
    }
  }
`

const ws = channel('jeetiss.io')

export default () => {
  const mid = nanoid()
  const node = html`
    <div class="full-width ${bollContainer}">
      <h3 class="name">sockets</h3>
    </div>
  `

  node.addEventListener('click', () => {
    ws.trigger('click', { id: mid })
  })

  ws.on('click', data => {
    const boll = html`
      <div class=${container}>
        <div class="${bllcss} ${data.id !== mid ? enemy : ''}"></div>
      </div>
    `

    boll.addEventListener('animationend', e => {
      removeNode(e.target)
    })

    node.appendChild(boll)
  })

  return node
}
