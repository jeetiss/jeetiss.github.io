export const svelteRoot = (Component) => () => {
  const target = document.createElement('div')
  // eslint-disable-next-line no-new
  new Component({ target })

  return target
}

export const url = import.meta.url
