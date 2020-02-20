import id from 'nanoid'
import { channel } from '@brows/client'

const getStatus = (id, election, coordinatorId, ping, status) => `
  <div>ID: ${id}</div>
  <div>EL: ${election ? '+' : '-'}</div>
  <div>CID: ${coordinatorId}</div>
  <div>PING: ${ping}</div>
  <div>STAT: ${typeof status === 'string' ? status : 'conecting'}</div>
`

const run = arr => arr.forEach(fn => fn())

const pingMaster = (pid, transport) => new Promise((resolve, reject) => {
  let id
  let ping
  const start = Date.now()
  const subs = [
    transport.on('ping', (data) => {
      if (data.pid === pid) {
        console.log(Date.now() - start)
        ping = Math.max(Date.now() - start, 900)

        id = setTimeout(() => {
          run(subs)
          resolve({ ping })
        }, Math.round(ping * 1.5))
      }
    }),

    transport.on('pong', ({ pid }) => {
      run(subs)
      clearTimeout(id)
      resolve({ ping, cid: pid })
    })
  ]

  transport.trigger('ping', { pid })
})

export default () => {
  const div = document.querySelector('body main div')

  const transport = channel('sockets')
  const pid = id()
  let election = false
  let coordinatorId = null
  let electionTimeout
  let forkTimeout
  let restartTimeout
  let unsub = () => void 0

  pingMaster(pid, transport).then(({ ping, cid }) => {
    const startElection = () => {
      clearTimeout(restartTimeout)
      clearTimeout(forkTimeout)
      clearTimeout(electionTimeout)
      unsub()
      election = false
      coordinatorId = pid
      transport.trigger('election', { pid })
      electionTimeout = setTimeout(() => {
        transport.trigger('coordinator', { pid })
      }, ping * 3)
    }

    const fork = () => {
      console.log('fork')

      const trigger = () => {
        forkTimeout = setTimeout(() => {
          transport.trigger('ping', { pid })

          restartTimeout = setTimeout(() => {
            startElection()
          }, ping * 4)
        }, Math.round(10000 + Math.random() * 20000))
      }

      unsub()
      unsub = transport.on('pong', () => {
        clearTimeout(restartTimeout)
        clearTimeout(forkTimeout)
        trigger()
      })
      trigger()
    }

    transport.on('election', (data) => {
      if (data.pid === pid) return

      unsub()
      clearTimeout(electionTimeout)
      clearTimeout(restartTimeout)
      clearTimeout(forkTimeout)

      election = true
      coordinatorId = null

      if (data.pid < pid) {
        transport.trigger('ok', { pid })
      }

      electionTimeout = setTimeout(() => {
        startElection()
      }, ping * 6)

      div.innerHTML = getStatus(pid, election, coordinatorId, ping)
    })

    if (cid) {
      coordinatorId = cid
      div.innerHTML = getStatus(pid, election, coordinatorId, ping, coordinatorId === pid ? 'master' : 'fork')
      fork()
    } else {
      startElection()

      div.innerHTML = getStatus(pid, election, coordinatorId, ping)
    }

    transport.on('ok', data => {
      if (election) return

      if (coordinatorId < data.pid) {
        coordinatorId = data.pid
      }

      clearTimeout(electionTimeout)
      electionTimeout = setTimeout(() => {
        transport.trigger('coordinator', { pid: coordinatorId })
      }, ping * 2)

      div.innerHTML = getStatus(pid, election, coordinatorId, ping)
    })

    transport.on('coordinator', ({ pid: winnerPid }) => {
      clearTimeout(electionTimeout)
      coordinatorId = winnerPid
      election = false

      div.innerHTML = getStatus(pid, election, coordinatorId, ping, coordinatorId === pid ? 'master' : 'fork')
      if (coordinatorId === pid) {
        console.log('master')

        unsub()
        unsub = transport.on('ping', () => {
          transport.trigger('pong', { pid })
        })
      } else {
        fork()
      }
    })
  })
}
