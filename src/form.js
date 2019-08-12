import { useReducer, useMemo } from 'react'

const merge = (a, b) => ({ ...a, ...b })
const initial = {}

export const useForm = (submit, validate = () => true) => {
  const [formData, set] = useReducer(merge, initial)

  const reset = () => set(
    Object.keys(formData).reduce((state, key) => ({ ...state, [key]: '' }), {})
  )

  const bindForm = () => ({
    onSubmit: (e) => {
      e && e.preventDefault()

      if (validate(formData)) {
        submit(formData, reset)
      }
    }
  })

  const bind = (name) => ({
    value: formData[name],
    onChange: (e) => set({ [name]: e.target.value })
  })

  const isValid = useMemo(() => validate(formData), [validate, formData])

  return {
    isValid,
    bindForm,
    bind
  }
}
