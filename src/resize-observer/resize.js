import { readable, writable } from 'svelte/store'

const $element = writable(null)

const flatp = ($element, fn, initValue) => {
  return readable(initValue, (set) => {
    let inner = () => {}
    const core = $element.subscribe((v) => {
      inner()
      inner = fn(v).subscribe((v) => set(v))
    })

    return () => {
      inner()
      core()
    }
  })
}

const $size = flatp($element, (element) => {
  if (element) {
    return readable({}, (set) => {
      const observer = new window.ResizeObserver((entries) => {
        const size = {
          width: Math.round(entries[0].contentRect.width),
          height: Math.round(entries[0].contentRect.height)
        }

        set(size)
      })

      observer.observe(element)

      return () => observer.unobserve(element)
    })
  }

  return readable({})
})

export { $size as size, $element as element }

// linear-gradient(315deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%), linear-gradient(315deg, #8FCDFF 0%, #2196F3 100%)
