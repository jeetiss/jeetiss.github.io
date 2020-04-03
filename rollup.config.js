import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import html from '@rollup/plugin-html'
import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'

import linaria from 'linaria/rollup'
import css from 'rollup-plugin-css-only'

import template from './index.template'

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

export default {
  input: 'src/index.js',

  output: {
    format: 'esm',
    dir: 'dist',
    sourcemap: isDev ? 'inline' : undefined
  },

  plugins: [
    html({ template }),
    babel({
      babelrc: false,
      plugins: [['@babel/plugin-transform-react-jsx', {
        pragma: 'h',
        pragmaFrag: 'Fragment'
      }]]
    }),
    svelte({
      dev: isDev,
      css: css => {
        css.write('dist/bundle.css')
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte', 'preact']
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    isProd && terser(),

    linaria({
      sourceMap: isDev
    }),
    css({
      output: 'dist/styles.css'
    })
  ]
}
