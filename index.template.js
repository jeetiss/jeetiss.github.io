import { makeHtmlAttributes } from '@rollup/plugin-html'

export default ({ attributes, files, publicPath }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script)
      return `<script src="${publicPath}${fileName}"${attrs}></script>`
    })
    .join('\n')

  return `
  <!DOCTYPE html>
  <html${makeHtmlAttributes(attributes.html)}>
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>-_-</title>
      <link rel="stylesheet" href="styles.css" />
      <link rel="stylesheet" href="bundle.css" />
    </head>

    <body>
      <main class="full-width">
        <img
          src="https://avatars2.githubusercontent.com/u/6726016?s=460&v=4"
          alt="image of my face"
        />

        <h1 style="max-width: 700px;">
          Привет, я Ивахненко Дмитрий, фронтенд&nbsp;инженер в
          <a target="_blank" href="https://uploadcare.com/">аплоадкеар</a>
        </h1>
      </main>

      <h2 class="full-width js-exps">Эксперименты</h2>

      <footer class="full-width">
        <p>Контакты:</p>

        <ul class="reset contacts">
          <li>
            <a target="_blank" href="https://twitter.com/jeetiss">Twitter</a>
          </li>
          <li><a target="_blank" href="">Telegram</a></li>
          <li>
            <a target="_blank" href="https://github.com/jeetiss">Github</a>
          </li>
          <li><a target="_blank" href="mailto:jeetiss@ya.ru">Mail</a></li>
        </ul>
      </footer>

      ${scripts}
    </body>
  </html>
`
}
