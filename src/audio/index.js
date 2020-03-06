import { html } from '../html'
import './audio.css'

function calculateTotalValue (length) {
  const minutes = Math.floor(length / 60)
  const seconds = Math.round(length - minutes * 60).toString().substr(0, 2)

  return `${minutes}:${seconds}`
}

function calculateCurrentValue (time) {
  var minutes = parseInt(time / 60) % 60
  var seconds = (time % 60).toFixed().padStart(2, '0')

  return `${minutes}:${seconds}`
}

export default () => {
  const node = html`
    <div class="player">
      <audio
        src="https://mdn.github.io/webaudio-examples/audio-analyser/viper.mp3"
        crossorigin="anonymous"
      ></audio>

      <span class="info current"></span>

      <button data-playing="false" class="control" role="switch">
        <svg
          class="play"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 320"
          width="24"
          height="24"
        >
          <path
            d="M296 146L40 2a16 16 0 00-24 14v288a16 16 0 0024 14l256-144a16 16 0 000-28z"
          />
        </svg>

        <svg
          class="pause"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 320"
          width="24"
          height="24"
        >
          <path
            d="M112 0H16C7 0 0 7 0 16v288c0 9 7 16 16 16h96c9 0 16-7 16-16V16c0-9-7-16-16-16zM304 0h-96c-9 0-16 7-16 16v288c0 9 7 16 16 16h96c9 0 16-7 16-16V16c0-9-7-16-16-16z"
          />
        </svg>
      </button>

      <span class="info total"></span>
    </div>
  `

  const current = node.querySelector('.current')
  const total = node.querySelector('.total')

  // load some sound
  let playing = false
  const audioElement = node.querySelector('audio')
  const playButton = node.querySelector('.control')

  // if track ends
  audioElement.addEventListener(
    'ended',
    () => {
      playing = false
      playButton.dataset.playing = playing
    },
    false
  )

  // play pause audio
  playButton.addEventListener(
    'click',
    function () {
      if (playing) {
        audioElement.pause()
        // if track is playing pause it
      } else {
        audioElement.play()
      }

      playing = !playing
      playButton.dataset.playing = playing
    },
    false
  )

  const createUpdateTimeline = () => {
    let prevNow
    let prevAll
    return (now, all) => {
      if (now !== prevNow) {
        current.textContent = calculateCurrentValue(now)
        prevNow = now
      }

      if (all !== prevAll) {
        total.textContent = calculateTotalValue(all)
        prevAll = all
      }
    }
  }

  const updater = createUpdateTimeline()

  const loop = () => {
    updater(audioElement.currentTime, audioElement.duration)

    window.requestAnimationFrame(loop)
  }

  loop()

  return node
}
