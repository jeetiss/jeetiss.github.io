import { createMachine, interpret } from '@xstate/fsm'
import { html } from '../html'
import './audio.css'

// function calculateTotalValue (length) {
//   const minutes = Math.floor(length / 60)
//   const seconds = Math.round(length - minutes * 60).toString().substr(0, 2)

//   return `${minutes}:${seconds}`
// }

// function calculateCurrentValue (time) {
//   var minutes = parseInt(time / 60) % 60
//   var seconds = (time % 60).toFixed().padStart(2, '0')

//   return `${minutes}:${seconds}`
// }

const pickFn = (options, effect) => {
  const effectFn =
    typeof effect === 'string' ? options.effects[effect] : effect
  if (typeof effectFn === 'function') {
    return effectFn
  }

  throw Error(`not found effect: ${effect}`)
}

const Machine = (config, options) => {
  const effects = []
  let effectIndex = 0
  const createEffect = effectFn => {
    const index = effectIndex++

    const entry = (context, event) => {
      effects[index] = effectFn({ send: service.send, context, event })
    }

    const exit = () => {
      if (typeof effects[index] === 'function') {
        effects[index]()
      }
    }

    return {
      entry,
      exit
    }
  }

  const states = Object.fromEntries(
    Object.entries(config.states).map(([name, state]) => {
      if (state.effects) {
        const effects = state.effects.map(effect =>
          createEffect(pickFn(options, effect))
        )

        return [
          name,
          {
            ...state,
            entry: (state.entry || []).concat(
              effects.map(effect => effect.entry)
            ),
            exit: (state.exit || []).concat(effects.map(effect => effect.exit))
          }
        ]
      }

      return [name, state]
    })
  )

  const service = interpret(
    createMachine(
      {
        ...config,
        states
      },
      options
    )
  )

  return service
}

const player = src => {
  const node = html`
    <div class="player">
      <audio src="${src}" crossorigin="anonymous"></audio>

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

  const audioElement = node.querySelector('audio')
  // const playButton = node.querySelector('.control')
  // const current = node.querySelector('.current')
  // const total = node.querySelector('.total')

  const audioMachine = createMachine(
    {
      id: 'light',
      initial: 'initial',
      states: {
        initial: {
          on: {
            LOAD: 'idle'
          }
        },
        idle: {
          entry: ['log'],
          on: {
            PLAY: 'playing'
          }
        },
        playing: {
          entry: ['play'],
          on: {
            PAUSE: 'paused'
          }
        },
        paused: {
          entry: ['pause'],
          on: {
            PLAY: 'playing'
          }
        }
      }
    },
    {
      actions: {
        play: (context, event) => {
          console.log('play', context, event)
        },
        pause: (context, event) => {
          console.log('pause', context, event)
        },
        log: (context, event) => {
          console.log('log', audioElement.duration, audioElement.currentTime)
        }
      }
    }
  )

  const service = interpret(audioMachine)

  service.subscribe(state => {
    console.log(state.value)
  })

  service.start()

  audioElement.addEventListener('loadeddata', () => {
    console.log('loaded')
    service.send('LOAD')
  })

  return {
    element: node
  }
}

export default () => {
  // const track =
  //   'https://mdn.github.io/webaudio-examples/audio-analyser/viper.mp3'

  const machine = Machine(
    {
      initial: 'idle',
      context: {
        count: 0
      },
      states: {
        idle: {
          effects: ['timeout'],
          on: {
            TIMER: 'work'
          }
        },
        work: {
          effects: [() => console.log('hehe 21'), 'timeout'],
          on: {
            TIMER: 'idle'
          }
        }
      }
    },
    {
      effects: {
        timeout: ({ send }) => {
          const id = setTimeout(() => send('TIMER'), 2000)
          return () => clearTimeout(id)
        }
      }
    }
  )

  machine.start()

  // return player(track).element

  return document.createElement('span')
}
