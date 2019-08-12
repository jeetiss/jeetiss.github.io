import React, { useEffect, useRef } from 'react'

import { useForm } from './form'
import { useAnalitycs } from './ga'
import './app.css'

const validate = (values) => values.text && values !== ''

export default () => {
  const area = useRef()
  const send = useAnalitycs()
  const submit = (values, reset) => {
    send({ ec: 'send form', ea: values.text })
    reset()
  }

  useEffect(() => {
    area.current.focus()
  }, [])

  const { bindForm, bind, isValid } = useForm(submit, validate)

  return (
    <form {...bindForm()}>
      <div className='container'>
        <textarea ref={area} {...bind('text')} />

        <button disabled={!isValid}>Send</button>
      </div>
    </form>
  )
}
