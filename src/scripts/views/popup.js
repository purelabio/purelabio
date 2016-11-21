import {bindPopup, bindValue} from '../utils'

export function Popup (__, {read, env}) {
  const popup = ['popups', 'form']
  const visible = read(...popup)

  if (!visible) return null

  return (
    <div className='fix-t-l fix-b-r col-center-center bg-primary-dark'>
      <form className='relative width-24 col-start-stretch children-margin-1-v'>
        <input className='input' type='email' placeholder='Email'
               {...bindValue(read, env, ['email'])} />
        <input className='input' type='text' placeholder='Name'
               {...bindValue(read, env, ['name'])} />
        <input className='button-primary' type='submit' value='Send' />
        <span className='icon icon-cross color-white abs pointer'
              style={{bottom: '100%', left: '100%', margin: '2rem'}}
              {...bindPopup(env, 'form', false)} />
      </form>
    </div>
  )
}
