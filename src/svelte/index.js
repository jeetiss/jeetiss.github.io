import sizer from '../size-of-js.js'

export default () => sizer(() => import('./component.js'), 'svelte')
