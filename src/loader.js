import { html } from './html.js'
import { css } from 'astroturf'

const spcss = css`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`

const dot = css`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;

  background-color: #222;

  z-index: 10;

  animation: bimp 0.6s ease-in-out infinite alternate;

  &:nth-child(1) {
    animation-delay: 0;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bimp {
    from {
      opacity: 0;
      transform: scale(0.5);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const suaqka = css`
  position: relative;
  color: #aaa;

  min-height: 150px;
  height: 100%;
`

const bottom = css`
  position: absolute;
  right: 10px;
  bottom: 10px;

  text-align: right;
`

const spinner = () => html`
  <div class=${spcss}>
    <span class=${dot}></span>
    <span class=${dot}></span>
    <span class=${dot}></span>
  </div>
`

export default () => {
  const node = html`
    <div class=${suaqka}>
      <div class=${bottom}>
        Loader from
        <a target="_blank" href="https://www.youtube.com/watch?v=3rWwFN2ckh0">
          subzey's talk
        </a>
      </div>
    </div>
  `

  node.appendChild(spinner())

  return node
}
