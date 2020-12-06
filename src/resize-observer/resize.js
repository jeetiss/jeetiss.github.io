import { writable } from 'svelte/store'

const resize = (element) => {
  const observer = new window.ResizeObserver((entries) => {
    const size = {
      width: Math.round(entries[0].contentRect.width),
      height: Math.round(entries[0].contentRect.height)
    }

    element.dispatchEvent(new window.CustomEvent('resize', {
      detail: { size }
    }))
  })

  observer.observe(element)

  return {
    destroy () {
      observer.unobserve(element)
    }
  }
}

const createHandler = (initial) => {
  const value = writable(initial)

  return [value, (e) => value.set(e.detail.size)]
}

export { createHandler, resize }

// linear-gradient(315deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%), linear-gradient(315deg, #8FCDFF 0%, #2196F3 100%)
