/** @jsx Preact.h */
/** @jsxFrag Preact.Fragment */

import * as Preact from 'preact'
import { useState } from 'preact/hooks'

const Count = () => {
  const [count, set] = useState(0)

  return (
    <div>
      <button onClick={() => set((value) => value - 1)}>dec</button>

      <span>{count}</span>

      <button onClick={() => set((value) => value + 1)}>inc</button>
    </div>
  )
}

export default () => {
  const root = document.createDocumentFragment()

  // eslint-disable-next-line react/no-deprecated
  Preact.render(<Count />, root)

  return root
}

export const files = [import.meta.url]
