import { html } from './html'
import { css } from 'linaria'

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const text = css`
  margin: 0;
  padding-top: 24px;
  color: #aaa;
`

const file = css`
  position: relative;

  border: 10px;
`

const list = css`
  width: 92px;
  height: 128px;
  filter: drop-shadow(0px 2px 14px rgba(0 0 0 / 0.1))
    drop-shadow(0px 1px 3px rgba(0 0 0 / 0.1));
`

const triangle = css`
  position: relative;
  float: right;
  width: 0;
  height: 0;
  border-bottom: 34px solid white;
  border-right: 34px solid transparent;

  filter: drop-shadow(-1px 1px 1px rgba(0 0 0 / 0.1))
    drop-shadow(0px 4px 8px rgba(0 0 0 / 0.05));

  z-index: 1;
`

const longBox = css`
  float: left;
  width: 58px;
  height: 128px;
  background-color: white;
`

const shortBox = css`
  float: right;
  width: 34px;
  height: 94px;
  background-color: white;
`

const badge = css`
  background-color: #404045;
  border-radius: 3px;
  color: white;
  padding: 4px 4px 3px;
  min-width: 64px;

  font-family: sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.004px;
  text-align: center;

  position: absolute;
  top: 84px;
  left: -14px;
`

export default () => {
  const node = html`
  <div class="${container}">
    <div class="${file}">
      <div class="${list}">
        <div class="${longBox}"></div>
        <div class="${triangle}"></div>
        <div class="${shortBox}"></div>
      </div>

      <div class="${badge}">PDF</div>
    </div>

    <p class="${text}">CSS only icon</p>
  </div>
  `

  return node
}
