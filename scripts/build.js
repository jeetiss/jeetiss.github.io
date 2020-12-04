import { constants } from 'fs'
import { readdir, access, mkdir, copyFile } from 'fs/promises'
import { extname, join, basename } from 'path'
import unified from 'unified'
import vfile from 'to-vfile'
import report from 'vfile-reporter'
import markdown from 'remark-parse'
import slug from 'remark-slug'
import toc from 'remark-toc'
import remark2rehype from 'remark-rehype'
import doc from 'rehype-document'
import stringify from 'rehype-stringify'
import yaml from 'yaml'
import frontmatter from 'remark-frontmatter'
import extract from 'remark-extract-frontmatter'
import { html, template } from 'rehype-template'

const BUILD_FOLDER = './dist/posts'
const POSTS_FOLDER = './posts'
const STYLE = './src/styles/article.css'

const t = (node, frontmatter) => html`<main class="content">
  <h1>${frontmatter.title}</h1>
  ${node}
</main>`

var processor = unified()
  .use(markdown)
  .use(frontmatter)
  .use(extract, { yaml: yaml.parse })
  .use(slug)
  .use(toc)
  .use(remark2rehype)
  .use(template, { template: t })
  .use(doc, {
    title: 'Contents',
    css: `../${basename(STYLE)}`,
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Inter&family=Montserrat:wght@700&display=swap',
        rel: 'stylesheet'
      }
    ]
  })
  .use(stringify)

access(BUILD_FOLDER, constants.F_OK)
  .catch(() => true)
  .then((err) => {
    if (err) return mkdir(BUILD_FOLDER)
    return true
  })
  .then(() => readdir(POSTS_FOLDER))
  .then((files) =>
    files
      .filter((file) => extname(file) === '.md')
      .map((file) => join(POSTS_FOLDER, file))
  )
  .then((files) => Promise.all(files.map((file) => vfile.read(file))))
  .then((files) => Promise.all(files.map((file) => processor.process(file))))
  .then((files) =>
    Promise.all(
      files.map((file) => {
        console.error(report(file))

        file.dirname = BUILD_FOLDER
        file.extname = '.html'
        return vfile.write(file).then(() => file.data)
      })
    )
  )
  .then((info) => console.log(info))
  .then(() => copyFile(STYLE, `./dist/${basename(STYLE)}`))
