import GAnalytics from 'ganalytics'
import { insertAfter } from './html'

GAnalytics('UA-126675501-1')

const box = document.querySelector('.js-exps')

const experimens = [
  // () => import('./audio'),
  () => import('./covid'),
  () => import('./loader'),
  () => import('./sockets'),
  () => import('./link')
]

experimens.reduce(
  (promise, moduleCreator) =>
    promise
      .then(node => Promise.all([moduleCreator(), node]))
      .then(([{ default: createModule }, node]) => {
        const moduleNode = createModule()
        insertAfter(moduleNode, node)
        return moduleNode
      }),
  Promise.resolve(box)
)
