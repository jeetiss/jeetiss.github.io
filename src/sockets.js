import id from 'nanoid'
import { channel } from '@brows/client'

const getStatus = (id, election, coordinatorId, ping, status) => `
  <div>ID: ${id}</div>
  <div>EL: ${election ? '+' : '-'}</div>
  <div>CID: ${coordinatorId}</div>
  <div>PING: ${ping}</div>
  <div>STAT: ${typeof status === 'string' ? status : 'conecting'}</div>
`

const getPing = (pid) => new Promise((resolve, reject) => {
  const start = Date.now()
  const transport = channel(`ping-${pid}`)
  transport.on('pong', () => {
    resolve(Date.now() - start)
    transport.destroy()
  })
  transport.trigger('pong')
})

export default () => {
  const div = document.querySelector('body main div')

  const transport = channel('sockets')
  const pid = id()
  let election = false
  let coordinatorId = null
  let electionTimeout

  getPing(pid).then((ping) => {
    transport.on('election', (data) => {
      if (data.pid === pid) return

      clearTimeout(electionTimeout)

      election = true
      coordinatorId = null

      if (data.pid < pid) {
        transport.trigger('ok', { pid })
      }

      div.innerHTML = getStatus(pid, election, coordinatorId, ping)
    })

    coordinatorId = pid
    transport.trigger('election', { pid })
    electionTimeout = setTimeout(() => {
      transport.trigger('coordinator', { pid })
    }, ping * 3)

    div.innerHTML = getStatus(pid, election, coordinatorId, ping)

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
      coordinatorId = winnerPid
      election = false

      div.innerHTML = getStatus(pid, election, coordinatorId, ping, coordinatorId === pid ? 'master' : 'fork')
      if (coordinatorId === pid) {
        console.log('master')
      } else {
        console.log('fork')
      }
    })
  })
}
