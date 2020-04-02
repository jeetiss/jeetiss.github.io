import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import html from '@rollup/plugin-html'
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
    resolve({ browser: true }),
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
