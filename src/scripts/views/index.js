import {bind, pipe} from 'prax'
import {bindValue, togglePopup, preventDefault} from '../utils'
import {Carousel, CarouselItem} from './carousel'

export function Index () {
  return (
    <div className='col-start-stretch children-margin-4-v padding-4-t padding-8-b'>
      <div className='container align-center'>
        <h1>
          Let&rsquo;s create something awesome<br />
          that your users will love
        </h1>
        <p className='color-text-light'>
          We&nbsp;are a consulting company of&nbsp;developers and designers,
          creating great products for web and mobile
          in&nbsp;close partnership with our customers
        </p>
        <Form />
      </div>
      <MacBook />
      <Skills />
      <Form />
      <Projects />
      <Contacts />
    </div>
  )
}

function MacBook () {
  return (
    <div className='relative container'>
      <div style={{
        background: 'url(/images/macbook.svg) top center no-repeat',
        backgroundSize: 'contain',
        height: '383px'
      }} />
      <div className='abs-t translate-x-50p bg-top-center' style={{
        top: '40px',
        right: '386px',
        width: '496px',
        height: '289px',
        backgroundImage: 'url(/images/projects/tobox-0.jpg)',
        backgroundSize: '496px',
      }}>

      </div>
    </div>
  )
}

function Icon ({filename, title}) {
  return (
    <div className='bg-contain'
         style={{
           width: '5rem',
           height: '5rem',
           backgroundImage: `url(/images/${filename})`
         }}
         alt={title} alt='' />
  )
}

function Skills () {
  return (
    <div>
      <a id='whoweare' />
      <div className='container children-margin-1x5-v'>
        <div>
          <h2>Preferred Skills and Technologies</h2>
          <ul className='color-text-light'>
            <li>
              Frontend: ES2015-2017, React, Prax, Flux, D3.js, SCSS, Stylebox, Gulp, Webpack, ClojureScript
            </li>
            <li>
              Backend: Node, Clojure, Erlang, Haskell
            </li>
            <li>              Databases: Firebase, Datomic.
            </li>
          </ul>
        </div>
        <div className='row-around-center padding-1-t padding-4-b'>
          <Icon filename='javascript.svg' title='JavaScript' />
          <Icon filename='react.svg' title='React' />
          <Icon filename='flux.svg' title='Flux' />
          <Icon filename='firebase.svg' title='Firebase' />
          <Icon filename='webpack.svg' title='Webpack' />
          <Icon filename='d3.svg' title='D3.js' />
        </div>
        <div>
          <h2>Secondary Skills and Technologies</h2>
          <ul className='color-text-light'>
            <li>
              Mobile: Android, iOS
            </li>
            <li>
              Backend: Ruby, Python, Go
            </li>
            <li>
              Databases: Postgres
            </li>
          </ul>
        </div>
        <div className='row-around-center padding-1-t padding-4-b'>
          <Icon filename='ios.svg' title='iOS' />
          <Icon filename='android.svg' title='Android' />
          <Icon filename='ruby.svg' title='Ruby' />
          <Icon filename='python.svg' title='Python' />
          <Icon filename='postgresql.svg' title='PostgreSQL' />
        </div>
        {void (
        <div>
          <h2>Preferred Projects</h2>
          <ul className='color-text-light'>
            <li>
              Web Single Page Applications
              <ul>
                <li>
                  For us, web single page applications are the most preferable type
                  of project because we have lots of experience and a toolkit for
                  building them.
                </li>
              </ul>
            </li>
            <li>
              Machine Learning and AI
              <ul>
                <li>
                  We see this as a very promising technology, and are looking
                  for
                </li>
              </ul>
            </li>
          </ul>
        </div>)}
        <div>
          <h2>We do</h2>
          <ul className='color-text-light'>
            <li>
              Single page applications&nbsp;&mdash; using latest technologies and approaches
            </li>
            <li>
              Continuous integration and delivery&nbsp;&mdash; build
              and deploy to&nbsp;production automatically
            </li>
            <li>
              Functional programming&nbsp;&mdash; it&nbsp;lets&nbsp;us
              create complex applications without defects
            </li>
            <li>
              Reactive programming&nbsp;&mdash; for highly dynamic applications
              that update in realtime
            </li>
          </ul>
        </div>
        <div className='row-around-center padding-1-t padding-4-b'>
          <Icon filename='git.svg' title='Git' />
          <Icon filename='jenkins.svg' title='Jenkins' />
          <Icon filename='haskell.svg' title='Haskell' />
        </div>
        <div>
          <p className='color-text-light'>
            We see machine learning as a promising technology that may obsolete
            older technologies and languages. We're looking for an opportunity
            to get involved with ML and AI.
          </p>
        </div>
        <div className='row-around-center padding-1-t'>
          <Icon filename='machine-learning.svg' title='Machine Learning' />
        </div>
      </div>
    </div>
  )
}

function Projects () {
  return (
    <div>
      <a id='portfolio' />
      <div className='align-center children-margin-1x5-v'>
        <h2>Our projects</h2>
        <Carousel>
          <CarouselItem pics={['tobox-0.jpg', 'tobox-1.jpg']}
                        id='ToBox' href='//tobox.com/' />
          <CarouselItem pics={['fiesta-0.jpg', 'fiesta-1.jpg']}
                        id='Ford Fiesta' href='//fiesta.ford.ru/' />
          <CarouselItem pics={['tpu-0.jpg', 'tpu-1.jpg']}
                        id='TPU Shop' href='//shop.tpu.ru/' />
          <CarouselItem pics={['ecosport-0.jpg']}
                        id='Ford EcoSport' href='//ecosport.ford.ru/' />
          <CarouselItem pics={['poi-0.jpg', 'poi-1.jpg']}
                        id='Just POI' href='//prostopoi.ru/' />
          <CarouselItem pics={['mediasem-0.jpg', 'mediasem-1.jpg']}
                        id='Mediaseminar' href='//mediaseminar.ru/' />
        </Carousel>
      </div>
    </div>
  )
}

function Contacts () {
  return (
    <div>
      <a id='contacts' />
      <div className='container col-start-center children-margin-1x5-v'>
        <h2>Contacts</h2>
        <div className='col-start-stretch children-undecorated children-margin-0x5-v'>
          <a href='skype:yury.egorenkov?chat'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-skype color-primary' />
            <span>yury.egorenkov</span>
          </a>
          <a href='mailto:info@purelab.io'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-email color-primary' />
            <span>info@purelab.io</span>
          </a>
          <a href='tel:79169003777'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-call color-primary' />
            <span>+7 916 900 3777</span>
          </a>
          <a href='tel:38268839813'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-call color-primary' />
            <span>+382 68 839 813</span>
          </a>
        </div>
        <div className='row-start-center children-margin-1-h'>
          <a href='/static/agreement.pdf'>Agreement</a>
          <a href='/static/tariffs.pdf'>Tariffs</a>
        </div>
      </div>
    </div>
  )
}

function Form (__, {read, env}) {
  return (
    <form className='row-center-stretch margin-3-t'
          onSubmit={pipe(preventDefault, bind(env.swap, togglePopup, 'form'))}>
      <input type='email'
             placeholder='Enter your email'
             className='input width-24 shadow-in-divider rounded-l'
             {...bindValue(read, env, ['form', 'email'])} />
      <button className='button-primary rounded-r'>
        Contact us
      </button>
    </form>
  )
}
