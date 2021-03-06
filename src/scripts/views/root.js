import {bind} from 'prax'
import {togglePopup} from '../utils'
import {Link} from 'react-router'
import {Popup} from './popup'

export function Root ({children}) {
  return (
    <div>
      <Header />
      {children}
      <Popup />
    </div>
  )
}

function Header (__, {env}) {
  return (
    <header className='row-between-center container-wide padding-1-v'>
      <div className='row-start-center children-undecorated children-margin-3-h
                      uppercase font-2 weight-600 color-links-text'>
        <Link to='' style={{color: '#0097A7'}}>Purelab.io</Link>
        <a href='#whoweare'>Who we are</a>
        <a href='#customers'>Customers</a>
        <a href='#technologies'>Technologies</a>
        <a href='#portfolio'>Portfolio</a>
        <a href='#contacts'>Contacts</a>
      </div>
      <button className='button-primary' onClick={bind(env.swap, togglePopup, 'form')}>
        Contact us
      </button>
    </header>
  )
}
