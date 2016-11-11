import {Link} from 'react-router'

export function Root ({children}) {
  return (
    <div className='col-start-stretch' style={{minHeight: '100vh'}}>
      <Header />
      {children}
    </div>
  )
}

function Header () {
  return (
    <header className='container row-between-center padding-1-v
                       color-dark color-links-primary-dark
                       bg-white uppercase'>
      <Link to='' className='undecorated'>Purelab.io</Link>
      <div className='row-start-center children-margin-1-h children-undecorated'>
        <a href=''>Who we are</a>
        <a href=''>Portfolio</a>
        <a href=''>Contacts</a>
      </div>
    </header>
  )
}
