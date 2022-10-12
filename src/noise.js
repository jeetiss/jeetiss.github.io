import { html } from './html.js'
import { css } from 'astroturf'

const DPR = window.devicePixelRatio || 1

const block = css`
  display: block;
  position: relative;
`

const canva = css`
  transform-origin: 0 0;
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
`

const text = css`
  font-size: 24px;
  font-weight: bold;
  color: white;
  padding: 12px;
`

const makeNoise = (canvas) => {
  const ctx = canvas.getContext('2d')
  const parent = canvas.parentNode
  let size
  const resize = () => {
    size = [parent.clientWidth * DPR, parent.clientHeight * DPR]
  }

  resize()
  window.addEventListener('resize', resize)

  const draw = () => {
    if (canvas.width !== size[0] || canvas.height !== size[1]) {
      canvas.width = size[0]
      canvas.height = size[1]
    }

    const maxSize = 65535 / 8
    const bufferHeight = Math.trunc(maxSize / canvas.width)
    const iterations = Math.trunc(canvas.height / bufferHeight) + 1

    const pixels = ctx.createImageData(canvas.width, bufferHeight)
    const noise = new Uint8Array(canvas.width * bufferHeight)
    for (let i = 0; i < iterations; i++) {
      window.crypto.getRandomValues(noise)

      for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 3] = ((noise[i >> 2] * 0.6) / 255) * 255
      }

      ctx.putImageData(pixels, 0, bufferHeight * i)
    }

    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
}

export default () => {
  const node = html`
    <div class="${block}">
      <canvas class="${canva}" style="transform: scale(${1 / DPR})"></canvas>
      <div class="${text}">NOISE</div>
    </div>
  `

  const canvas = node.querySelector('canvas')

  setTimeout(() => {
    makeNoise(canvas)
  })

  return node
}
