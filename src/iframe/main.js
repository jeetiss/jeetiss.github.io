import { html } from '../html'
// import { css } from 'linaria'

const body = document.querySelector('body')

const futch = () => {
  console.log(42)
  return 42
}

body.append(
  html`
    <web-comp load="${futch}">third</web-comp>
  `
)
