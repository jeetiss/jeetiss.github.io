import Pusher from 'pusher-js'
import id from 'nanoid'

const channels = new Pusher('b99606f098d417058fed', {
  cluster: 'eu'
})

const channel = name => {
  const chl = channels.subscribe(name)

  return {
    destroy: () => {
      chl.disconnect()
    },
    on: (event, handler) => {
      chl.bind(event, handler)
    },

    emit: (event, data) => {
      const { fetch } = window
      return fetch(`https://brows.jeetiss.now.sh/api/${name}/${event}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (!res.ok) {
          console.error('failed to push data')
        }
      })
    }
  }
}

// export default () => {
//   let tid
//   const myId = id()
//   let clients = new Set([myId])

//   const sender = channel('value')

//   sender.on('get', ({ idOfInit }) => {
//     console.log(`node with ${idOfInit} starts counting`)

//     if (idOfInit !== myId) {
//       clearTimeout(tid)
//       console.log(`sending my id`)
//       sender.emit('set', { id: myId, idOfInit })
//     }
//   })

//   sender.on('set', ({ id, idOfInit }) => {
//     console.log(`recive node ${id} from ${idOfInit}`)
//     if (idOfInit === myId) {
//       clients.add(id)
//     }
//   })

//   setTimeout(() => {
//     clients = new Set([myId])
//     sender.emit('get', { idOfInit: myId })

//     tid = setTimeout(() => {
//       console.log('finish counting')
//       console.log('size: ', clients.size)
//     }, 5000)
//   })
// }

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
  transport.emit('pong')
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
        transport.emit('ok', { pid })
      }

      div.innerHTML = getStatus(pid, election, coordinatorId, ping)
    })

    coordinatorId = pid
    transport.emit('election', { pid })
    electionTimeout = setTimeout(() => {
      transport.emit('coordinator', { pid })
    }, ping * 3)

    div.innerHTML = getStatus(pid, election, coordinatorId, ping)

    transport.on('ok', data => {
      if (election) return

      if (coordinatorId < data.pid) {
        coordinatorId = data.pid
      }

      clearTimeout(electionTimeout)
      electionTimeout = setTimeout(() => {
        transport.emit('coordinator', { pid: coordinatorId })
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
