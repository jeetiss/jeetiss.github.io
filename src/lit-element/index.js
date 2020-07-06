import sizer from '../size-of-js'
import { files } from './component'

export default () => sizer(() => import('./component'), files, 'lit-element')
