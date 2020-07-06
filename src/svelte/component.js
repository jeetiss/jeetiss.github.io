import App, { url } from './app.svelte'
import { svelteRoot, url as Root } from '../svelte-root'

export const files = [import.meta.url, url, Root]
export default svelteRoot(App)
