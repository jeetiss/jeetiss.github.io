let e = []
let loaded = false

export const track = (...args) => {
  if (loaded) {
    window.splitbee.track(...args)
  } else {
    e.push(args)
  }
}

export const init = () => {
  var script = document.createElement('script')
  script.src = 'https://cdn.splitbee.io/sb.js'

  script.addEventListener('load', () => {
    e.forEach((args) => {
      window.splitbee.track(...args)
    })

    loaded = true
    e = []
  }, { once: true })

  document.body.append(script)
}
