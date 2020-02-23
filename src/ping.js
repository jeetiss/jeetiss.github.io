import { channel } from '@brows/client'
import { createMachine, interpret } from '@xstate/fsm'
import nanoid from 'nanoid'

const ws = channel('asap-pasa')

export default () => {
  const isServer = Boolean(new URLSearchParams(document.location.search).get('server'))

  if (isServer) {
    createServer()
  } else {
    createClient()
  }
}

const createClient = () => {
  const pingMachine = createMachine({
    id: 'ping',
    initial: 'idle',
    context: {
      timeouts: 0
    },
    states: {
      idle: {
        on: {
          PING: 'waiting'
        }
      },
      waiting: {
        on: {
          PONG: 'idle',
          TIMEOUT: 'failure'
        }
      },
      failure: {
        on: {
          PONG: 'idle'
        }
      }
    }
  })

  const pingServise = interpret(pingMachine).start()

  pingServise.subscribe(console.log)
}

const createServer = () => {
  const cid = nanoid()
  ws.on('ping', () => {
    ws.trigger('pong', { cid })
  })

  ws.trigger('pong', { cid })
}
