import React from 'react'

import { useForm } from './form'
import { useAnalitycs } from './ga'
import './app.css'

const validate = (values) => values.text && values !== ''

export default () => {
  const send = useAnalitycs()
  const submit = (values, reset) => {
    send(values)
    reset()
  }

  const { bindForm, bind, isValid } = useForm(submit, validate)

  return (
    <form {...bindForm()}>
      <div className='container'>
        <textarea {...bind('text')} />

        <button disabled={!isValid}>Send</button>
      </div>
    </form>
  )
}
