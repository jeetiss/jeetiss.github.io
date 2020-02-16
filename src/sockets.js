import Pusher from 'pusher-js'

const channels = new Pusher('b99606f098d417058fed', {
  cluster: 'eu'
})

// Subscribe to the appropriate channel
const channel = channels.subscribe('channel')

channel.bind('event', function (data) {
  console.log(data)
})

function pushData (data) {
  const { fetch } = window
  return fetch('https://brows.jeetiss.now.sh/api/events', {
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

export default () => {
  pushData({ inc: true })
}
