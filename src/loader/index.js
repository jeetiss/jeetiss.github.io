import { html } from '../html'
import './spinner.css'

const spinner = () => html`
  <div class="spinner">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
`

export default () => {
  const node = html`
    <div class="suaqka">
      <div class="right-bottom">Лоадер из доклада <a href="">Антона Хлыновского</a></div> 
    </div>
  `

  node.appendChild(spinner())

  return node
}
