import { createContext, useContext, useCallback } from 'react'
import GA from 'ganalytics'

const context = createContext(GA('UA-126675501-1'))

export const useAnalitycs = () => {
  const ga = useContext(context)

  return useCallback((data) => ga.send('event', data), [ga])
}
