import sizer from '../size-of-js.js'
import { files } from './component.js'

export default () => sizer(() => import('./component.js'), files, 'preact')
