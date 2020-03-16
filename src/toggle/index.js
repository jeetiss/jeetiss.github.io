import nanoid from 'nanoid'
import { html } from '../html'

export default ({ first = 'one', second = 'two' } = {}) => {
  const name = nanoid()
  const node = html`
    <div>
      <label>
        <input type="radio" name="${name}" />

        ${first}
      </label>

      <label>
        <input type="radio" name="${name}" />

        ${second}
      </label>
    </div>
  `

  return node
}
