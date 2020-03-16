import { html } from '../html'
import createChart from 'covid-charts'

export default () => {
  const node = html`
    <div>
      <p>Статистика по covid-19:</p>

      <div class="chart"></div>

      <a href="https://jeetiss.github.io/covid-charts/">
        Добавить себе
      </a>
    </div>
  `

  createChart(node.querySelector('.chart'), { country: 'Russia' })

  return node
}
