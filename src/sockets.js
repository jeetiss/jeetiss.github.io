import Pusher from 'pusher-js'
import id from 'nanoid'

const channels = new Pusher('b99606f098d417058fed', {
  cluster: 'eu'
})

const channel = name => {
  const chl = channels.subscribe(name)

  return {
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

export default () => {
  let tid
  const myId = id()
  let clients = new Set([myId])

  const sender = channel('value')

  sender.on('get', ({ idOfInit }) => {
    console.log(`node with ${idOfInit} starts counting`)

    if (idOfInit !== myId) {
      clearTimeout(tid)
      console.log(`sending my id`)
      sender.emit('set', { id: myId, idOfInit })
    }
  })

  sender.on('set', ({ id, idOfInit }) => {
    console.log(`recive node ${id} from ${idOfInit}`)
    if (idOfInit === myId) {
      clients.add(id)
    }
  })

  setTimeout(() => {
    clients = new Set([myId])
    sender.emit('get', { idOfInit: myId })

    tid = setTimeout(() => {
      console.log('finish counting')
      console.log('size: ', clients.size)
    }, 5000)
  })
}
