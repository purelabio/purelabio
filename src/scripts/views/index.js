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
      <Customers />
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

function Customers () {
  return (
    <div className='container'>
      <a id='customers' />
      <h2>Customers</h2>
      <div className='row-around-center children-margin-4-v'>
        <a className='bg-top-center'
           style={{
             width: '200px',
             height: '100px',
             backgroundImage: 'url(/images/logos/butik.png)',
             backgroundSize: '200px',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: '0 10px',
           }}
           href='//butik.ru'
           target='_blank'
           title='Butik.ru' />
        <a className='bg-top-center'
           style={{
             width: '200px',
             height: '100px',
             backgroundImage: 'url(/images/logos/tobox.svg)',
             backgroundSize: '200px',
             backgroundRepeat: 'no-repeat',
           }}
           href='//tobox.com'
           target='_blank'
           title='Tobox.com' />
      </div>
      <div className='row-around-center'>
        <a className='bg-top-center'
           style={{
             width: '150px',
             height: '100px',
             backgroundImage: 'url(/images/logos/shanzhai.svg)',
             backgroundSize: '150px',
             backgroundRepeat: 'no-repeat',
           }}
           href='http://shanzhai.city'
           target='_blank'
           title='Shanzhai City' />
        <a className='bg-top-center'
           style={{
             width: '150px',
             height: '100px',
             backgroundImage: 'url(/images/logos/scribesense.png)',
             backgroundSize: '150px',
             backgroundRepeat: 'no-repeat',
           }}
           href='//scribesense.com'
           target='_blank'
           title='Scribesense' />
      </div>
    </div>
  )
}

function Skills () {
  return (
    <div>
      <div className='container children-margin-1x5-v'>
        <div>
          <a id='whoweare' />
          <h2>Advantages</h2>
          <ul className='color-text-light'>
            <li>
              Expert team: you get a cohesive team of web application experts, sure to produce a quality product
            </li>
            <li>
              Fast results: we do incremental development and delivery, each week produces a new feature or a significant improvement
            </li>
            <li>
              Long-term maintainability: we architect apps that are easy to maintain and extend. Stack and architecture knowledge is common in the team
            </li>
          </ul>
        </div>
        <div className='row-around-center padding-1-t padding-4-b'>
          <Icon filename='logos/git.svg' title='Git' />
          <Icon filename='logos/jenkins.svg' title='Jenkins' />
          <Icon filename='logos/haskell.svg' title='Haskell' />
        </div>

        {/*<div>
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
              Functional programming&nbsp;&mdash; lets&nbsp;us
              create complex applications without defects
            </li>
            <li>
              Reactive programming&nbsp;&mdash; for highly dynamic applications
              that update in realtime
            </li>
          </ul>
        </div>*/}

        <div>
          <h2>For whom</h2>
          <p className='color-text-light'>
            Ideal customer is a technical startup in early stages, looking for a high-quality team, or an established company branching into a new product
          </p>
          <div className='row-around-center padding-1-t padding-4-b'>
            <Icon filename='rocket.svg' title='Startup' />
            <Icon filename='pizza.svg' title='New project' />
          </div>
        </div>

        <div>
          <a id='technologies' />
          <h2>Preferred Skills and Technologies</h2>
          <ul className='color-text-light'>
            <li>
              Frontend: ES2015-2017, JavaScript, React, Prax, Flux, D3.js, SCSS, Stylebox, Gulp, Webpack, ClojureScript
            </li>
            <li>
              Backend: Node, Clojure, Erlang, Haskell
            </li>
            <li>
              Databases: Firebase, Datomic
            </li>
          </ul>
        </div>
        <div className='row-around-center padding-1-t padding-4-b'>
          <Icon filename='logos/javascript.svg' title='JavaScript' />
          <Icon filename='logos/react.svg' title='React' />
          <Icon filename='logos/flux.svg' title='Flux' />
          <Icon filename='logos/firebase.svg' title='Firebase' />
          <Icon filename='logos/webpack.svg' title='Webpack' />
          <Icon filename='logos/d3.svg' title='D3.js' />
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
          <Icon filename='logos/ios.svg' title='iOS' />
          <Icon filename='logos/android.svg' title='Android' />
          <Icon filename='logos/ruby.svg' title='Ruby' />
          <Icon filename='logos/python.svg' title='Python' />
          <Icon filename='logos/postgresql.svg' title='PostgreSQL' />
        </div>

        {/* <div>
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
        </div> */}

        <div>
          <p className='color-text-light'>
            We see machine learning as a promising technology that may obsolete
            older technologies and languages. We're looking for an opportunity
            to get involved with ML and AI.
          </p>
        </div>
        <div className='row-around-center padding-1-t'>
          <Icon filename='logos/machine-learning.svg' title='Machine Learning' />
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
        <h2>Projects</h2>
        <Carousel>
          <CarouselItem pics={['butik-0.jpg', 'butik-1.jpg']}
                        id='Butik' href='https://butik.ru/' />
          <CarouselItem pics={['tobox-0.jpg', 'tobox-1.jpg']}
                        id='ToBox' href='https://tobox.com' />
          <CarouselItem pics={['fiesta-0.jpg', 'fiesta-1.jpg']}
                        id='Ford Fiesta' href='http://fiesta.ford.ru' />
          <CarouselItem pics={['tpu-0.jpg', 'tpu-1.jpg']}
                        id='TPU Shop' href='http://shop.tpu.ru' />
          <CarouselItem pics={['ecosport-0.jpg']}
                        id='Ford EcoSport' href='http://ecosport.ford.ru' />
          <CarouselItem pics={['poi-0.jpg', 'poi-1.jpg']}
                        id='Just POI' href='http://prostopoi.ru' />
          <CarouselItem pics={['mediasem-0.jpg', 'mediasem-1.jpg']}
                        id='Mediaseminar' href='http://mediaseminar.ru' />
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
          <a href='mailto:info@purelab.io'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-email color-primary' />
            <span>info@purelab.io</span>
          </a>
        </div>
        {/* <div className='row-start-center children-margin-1-h'>
          <a href='static/terms.pdf' target='_blank'>
            Terms RU
          </a>
          <a href='static/pricing.pdf' target='_blank'>
            Pricing RU
          </a>
        </div> */}
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
