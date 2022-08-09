import { html } from './html.js'

function getGraphicsInformation (gl) {
  const renderInfo = gl.getExtension('WEBGL_debug_renderer_info')

  return {
    renderer: gl.getParameter(gl.RENDERER),
    vendor: gl.getParameter(gl.VENDOR),
    unmasked: {
      vendor: renderInfo != null ? gl.getParameter(renderInfo.UNMASKED_VENDOR_WEBGL) : '',
      renderer: renderInfo != null ? gl.getParameter(renderInfo.UNMASKED_RENDERER_WEBGL) : ''
    }
  }
}

function getVideocard () {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('webgl') || canvas.getContext('webgl2')

  const info = getGraphicsInformation(context)
  canvas.remove()

  return info.unmasked.renderer || info.renderer
}

export default () => {
  const card = getVideocard()
  const node = html`
    <div>
      Videocard: ${card}
    </div>
  `

  return node
}
