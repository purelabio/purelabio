import {Link} from 'react-router'

export function Root ({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

function Header () {
  return (
    <header className='row-between-center container-wide padding-1-v'>
      <div className='row-start-center children-undecorated children-margin-3-h
                      uppercase font-2 weight-600 color-links-text'>
        <Link to='' style={{color: '#0097A7'}}>Purelab.io</Link>
        <a href='#whoweare'>Who we are</a>
        <a href='#portfolio'>Portfolio</a>
        <a href='#contacts'>Contacts</a>
      </div>
      <button className='button-primary'>Go!</button>
    </header>
  )
}
