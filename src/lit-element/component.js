import { LitElement, css, html } from 'lit-element'

class MyElement extends LitElement {
  static get properties () {
    return {
      count: { type: Number }
    }
  }

  static get styles () {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        min-height: 80px;
      }

      :host > * {
        padding: 4px 8px;
      }
    `
  }

  constructor () {
    super()
    this.count = 0
  }

  render () {
    return html`
      <button @click=${this.decrement}>
        dec
      </button>
      <span>${this.count}</span>
      <button @click=${this.increment}>
        inc
      </button>
    `
  }

  decrement () {
    this.count -= 1
  }

  increment () {
    this.count += 1
  }
}

window.customElements.define('my-element', MyElement)

export default () => document.createElement('my-element')
