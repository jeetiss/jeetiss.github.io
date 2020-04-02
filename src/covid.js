import { html } from './html'
import createChart from 'covid-charts'

export default () => {
  const node = html`
    <div>
      <div class="chart" style="margin-bottom: 8px"></div>

      <a href="https://jeetiss.github.io/covid-charts/" >
        COVID-19 widget
      </a>
    </div>
  `

  createChart(node.querySelector('.chart'), { country: 'Russia' })

  return node
}
