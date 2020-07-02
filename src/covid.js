import { html } from './html'
import { css } from 'linaria'
import createChart from 'covid-charts'

const text = css`
  color: #aaa;
`
export default () => {
  const node = html`
    <div>
      <div class="chart" style="margin-bottom: 12px"></div>

      <a class="${text}" href="https://jeetiss.github.io/covid-charts/" >
        COVID-19 widget
      </a>
    </div>
  `

  createChart(node.querySelector('.chart'), { country: 'Russia' })

  return node
}
