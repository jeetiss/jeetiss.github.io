import { instantiateStreaming } from '@assemblyscript/loader'
import module from 'canvas-free-drawing'
import { css } from 'astroturf'
import { html } from '../html.js'
import cropSource from './code.wasm'
import { holst, size } from './initial.js'

const asm = instantiateStreaming(window.fetch(cropSource))

const clamp = (min, value, max) => Math.min(max, Math.max(value, min))

const crop = async (imageData, padding = 20) => {
  const { exports } = await asm
  const { crop, arrayPtr } = exports
  const { __newArray, __getArray } = exports

  const [top, right, bottom, left] = __getArray(
    crop(
      __newArray(arrayPtr, imageData.data),
      imageData.width,
      imageData.height
    )
  )

  return {
    top: clamp(0, top - padding, imageData.height),
    right: clamp(0, right + padding, imageData.width),
    bottom: clamp(0, bottom + padding, imageData.height),
    left: clamp(0, left - padding, imageData.width)
  }
}

const canvasClass = css`
  border: 1px solid #e2e2e2;
  box-shadow: 0px 5px 20px 5px rgb(0 0 0 / 20%);
`

const rightBlock = css`
  float: right;
`

export default function CROP () {
  const node = html`
    <div class="full-width">
      <canvas id="canvas" class="${canvasClass}"></canvas>

      <div class="${rightBlock}">
        <button>clear</button>
      </div>
    </div>
  `

  setTimeout(() => {
    const ref = node.querySelector('canvas#canvas')
    const button = node.querySelector('button')
    const { default: Draw } = module
    const cfd = new Draw({
      elementId: 'canvas',
      width: 1,
      height: 1
    })

    const resize = () => {
      cfd.width = node.clientWidth
      cfd.height = 200
      cfd.setDimensions()
      cfd.setBackground(cfd.backgroundColor)
    }

    resize()

    cfd.setLineWidth(5)

    const ctx = ref.getContext('2d')
    const first = new window.ImageData(size.width, size.height)
    first.data.set(new Uint8ClampedArray(Int32Array.from(holst).buffer))
    ctx.putImageData(first, size.left, size.top)

    const addCropRect = (left, top, width, height) => {
      ctx.save()
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 1
      ctx.strokeRect(left, top, width, height)
      ctx.restore()
    }

    const cropCallback = async () => {
      const data = ctx.getImageData(0, 0, ref.width, ref.height)
      const { top, right, bottom, left } = await crop(data, 1)
      addCropRect(left, top, right - left + 1, bottom - top + 1)
    }

    ref.addEventListener('cfd_mousedown', () => {
      ref.addEventListener('cfd_mouseleave', cropCallback, { once: true })
    })
    ref.addEventListener('cfd_mouseup', cropCallback)
    window.addEventListener('resize', resize)
    button.addEventListener('click', () => {
      ctx.save()
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, ref.width, ref.height)
      ctx.restore()
    })

    addCropRect(size.left, size.top, size.width, size.height)
  })

  return node
}
