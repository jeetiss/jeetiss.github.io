import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'

export default {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          },
          {
            loader: 'astroturf/loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: isProd
          ? [MiniCssExtractPlugin.loader, 'css-loader']
          : ['style-loader', 'css-loader']
      },
      {
        test: /\.(m4a|wasm)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svelte$/,
        use: 'svelte-loader'
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}
