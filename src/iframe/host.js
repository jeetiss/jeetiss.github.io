import { html } from '../html'
// import { css } from 'linaria'

// eslint-disable-next-line no-undef
class Stranger extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  // constructor () {
  //   super()
  // }

  connectedCallback () {
    const load = this.getAttribute('load')
    load()
  }
}

window.customElements.define('web-comp', Stranger)

export default () => {
  const iframe = html`<iframe src="./iframe.html" frameborder="0"></iframe> `

  iframe.addEventListener('load', () => {
    console.log(iframe.contentWindow)
    iframe.contentWindow.customElements.define(
      'web-comp',
      Stranger
    )
  })

  return iframe
}
