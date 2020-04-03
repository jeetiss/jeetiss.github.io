import { h, render } from 'preact'
import { useState } from 'preact/hooks'

const Count = () => {
  const [count, set] = useState(0)

  return (
    <div>
      <h3>preact</h3>

      <span>{count}</span>

      <div>
        <button onClick={() => set(value => value + 1)}>inc</button>
        <button onClick={() => set(value => value - 1)}>dec</button>
      </div>
    </div>
  )
}

export default () => {
  const root = document.createElement('div')

  render(<Count />, root)

  return root
}
