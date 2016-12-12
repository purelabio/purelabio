import {seq, bind, putIn} from 'prax'
import {Xhr} from 'xhttp'
import {bindPopup, bindValue, preventDefault} from '../utils'

const email   = ['form', 'email']
const name    = ['form', 'name']
const message = ['form', 'message']

export function Popup (__, {read, env}) {
  const popup = ['popups', 'form']
  const visible = read(...popup)

  if (!visible) return null

  return (
    <div className='fix-t-l fix-b-r col-center-center bg-primary-dark'>
      <form className='relative width-24 col-start-stretch children-margin-1-v'
            onSubmit={seq(preventDefault, bind(request, read, env))}>
        <input className='input' type='email' placeholder='Email' name='email' required
               {...bindValue(read, env, email)} />
        <input className='input' type='text' placeholder='Name' name='name' required
               {...bindValue(read, env, name)} />
        <textarea className='input' placeholder='Message' name='message' required
                  style={{resize: 'none'}} rows='3'
                  {...bindValue(read, env, message)} />
        <input className='button-primary' type='submit' value='Send' />
        <span className='color-white align-center font-4'>
          {read('xhr', 'message')}
        </span>
        <span className='color-accent align-center font-2'>
          {read('xhr', 'error')}
        </span>
        <span className='icon icon-cross color-white abs pointer'
              style={{bottom: '100%', left: '100%', margin: '2rem'}}
              {...bindPopup(env, 'form', null)} />
      </form>
    </div>
  )
}

function request (read, env) {
  const okMessage = 'Thank you! We will contact you as soon as possible.'
  Xhr({
    url: 'https://formspree.io/hello.voodoo@gmail.com',
    method: 'post',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json;charset=UTF-8',
    },
    body: {
      email: read(...email),
      name: read(...name),
      message: read(...message)
    }
  },
  ({ok, status}) => {
    if (ok) {
      env.swap(putIn, ['xhr', 'message'], okMessage)
    } else {
      env.swap(putIn, ['xhr', 'error'], status)
    }
  })
}
