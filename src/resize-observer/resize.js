import { writable } from 'svelte/store'

const resize = (element) => {
  const dispatch = (size) =>
    element.dispatchEvent(
      new window.CustomEvent('resize', {
        detail: { size }
      })
    )

  if (typeof window.ResizeObserver !== 'undefined') {
    const observer = new window.ResizeObserver((entries) => {
      const size = {
        width: Math.round(entries[0].contentRect.width),
        height: Math.round(entries[0].contentRect.height)
      }

      dispatch(size)
    })

    observer.observe(element)

    return {
      destroy () {
        observer.unobserve(element)
      }
    }
  } else {
    const sizer = () => {
      const rect = element.getBoundingClientRect()

      const size = {
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      }

      dispatch(size)
    }

    let id = setTimeout(() => {
      sizer()
      id = setInterval(sizer, 2000)
    }, 10)

    return {
      destroy () {
        clearInterval(id)
      }
    }
  }
}

const createHandler = (initial) => {
  const value = writable(initial)

  return [value, (e) => value.set(e.detail.size)]
}

export { createHandler, resize }

// linear-gradient(315deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%), linear-gradient(315deg, #8FCDFF 0%, #2196F3 100%)
