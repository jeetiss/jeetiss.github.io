import App from './app.svelte'

export default () => {
  const target = document.createElement('div')
  const a = new App({ target })

  console.log(a)

  return target
}
