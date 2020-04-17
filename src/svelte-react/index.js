import { h, render } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'
import Bind from './Bind.svelte'

const makePreact = (Component) => (props) => {
  const ref = useRef()
  const instance = useRef()

  useEffect(() => {
    const component = new Component({
      target: ref.current,
      props
    })

    instance.current = component

    return () => component.$destroy()
  }, [])

  useEffect(() => {
    instance.current.$set(props)
    return instance.current.$on('change', (e) =>
      props.onChange(e.detail.value)
    )
  }, [props])

  return <div ref={ref} />
}

const PreactBind = makePreact(Bind)

const preact = css`
  padding: 16px;
  border-radius: 5px;
  border: 1px solid red;
`

const Count = () => {
  const [value, set] = useState(0)

  return (
    <div class={preact}>
      <div>preact:</div>

      <button onClick={() => set('kek')}>Set kek!</button>

      <PreactBind value={value} onChange={set} />

      {value}
    </div>
  )
}

export default () => {
  const root = document.createElement('div')

  render(<Count />, root)

  return root
}
