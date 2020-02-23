import nanoid from 'nanoid'
import { channel } from '@brows/client'
import { html, removeNode } from '../html'

import './sock.css'

const ws = channel('jeetiss.io')

export default () => {
  const mid = nanoid()
  const node = html`
    <div class="full-width boll-container">
      <h3 class="name">сокеты</h3>
    </div>
  `

  node.addEventListener('click', () => {
    ws.trigger('click', { id: mid })
  })

  ws.on('click', data => {
    const boll = html`
      <div class="container">
        <div class="socket-boll ${data.id !== mid ? 'enemy' : ''}"></div>
      </div>
    `

    boll.addEventListener('animationend', e => {
      removeNode(e.target)
    })

    node.appendChild(boll)
  })

  return node
}
