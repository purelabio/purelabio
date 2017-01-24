import {seq, bind, putIn, pipe, alter} from 'prax'
import {Xhr} from 'xhttp'
import {togglePopup, bindValue, preventDefault} from '../utils'

const emailPath        = ['form', 'email']
const namePath         = ['form', 'name']
const messagePath      = ['form', 'message']
const popupPath        = ['popups', 'form']
const xhrPath          = ['formXhr']
const xhrMessagePath   = ['xhr', 'message']
const xhrErrorPath     = ['xhr', 'error']

export function Popup (__, {read, env}) {
  const visible = read(...popupPath)
  const syncing = !!read(...xhrPath)
  const message = read(...xhrMessagePath)

  if (!visible) return null

  return (
    <div className='fix-t-l fix-b-r col-center-center bg-primary-dark'>
      {message ?
      <div className='relative width-24 col-start-stretch children-margin-1-v'>
        <span className='color-white align-center font-4'>{message}</span>
        <CloseButton />
      </div> :
      <form className='relative width-24 col-start-stretch children-margin-1-v'
            onSubmit={seq(preventDefault, bind(request, read, env))}>
        <label className='color-white align-center'>Contact us!</label>
        <input className='input' type='email' placeholder='Email' name='email' readOnly={syncing} required autoFocus
               {...bindValue(read, env, emailPath)} />
        <input className='input' type='text' placeholder='Name' name='name' readOnly={syncing} required
               {...bindValue(read, env, namePath)} />
        <textarea className='input' placeholder='Message' name='message' readOnly={syncing} required
                  style={{resize: 'none'}} rows='3'
                  {...bindValue(read, env, messagePath)} />
        <button type='submit' className='button-primary' disabled={syncing}>Send</button>
        <span className='color-accent align-center font-2'>
          {read(...xhrErrorPath)}
        </span>
        <CloseButton />
      </form>}
    </div>
  )
}

function CloseButton (__, {env}) {
  return (
    <span className='icon icon-cross color-white abs pointer'
          style={{bottom: '100%', left: '100%', margin: '2rem'}}
          onClick={bind(env.swap, togglePopup, 'form')} />
  )
}

function request (read, env) {
  const okMessage = 'Thank you! We will contact you as soon as possible.'

  env.swap(pipe(
    alter(putIn, xhrMessagePath, null),
    alter(putIn, xhrErrorPath, null),
    alter(putIn, xhrPath, Xhr({
      url: 'https://formspree.io/info@purelab.io',
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json;charset=UTF-8',
      },
      body: {
        email: read(...emailPath),
        name: read(...namePath),
        message: read(...messagePath)
      }
    },
    ({ok, status, body: {error}}) => {
      env.swap(pipe(
        alter(putIn, xhrPath, null),
        alter(putIn, xhrMessagePath, ok ? okMessage : null),
        alter(putIn, xhrErrorPath, ok ? null : error || `Unexpected error (status ${status})`),
      ))
    }).start())
  ))
}
