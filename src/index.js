import GAnalytics from 'ganalytics'

GAnalytics('UA-126675501-1')

import('./sockets').then((mdl) => {
  mdl.default()
})
