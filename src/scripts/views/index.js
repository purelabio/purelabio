import {bindValue, bindPopup} from '../utils'
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
        right: '50%',
        width: '494px',
        height: '289px',
        backgroundImage: 'url(/images/projects/tobox-0.png)'
      }}>

      </div>
    </div>
  )
}

function Skills () {
  return (
    <div>
      <a id='whoweare' />
      <div className='container children-margin-1x5-v'>
        <div>
          <h2>Skills and Technologies:</h2>
          <ul className='color-text-light'>
            <li>
              Frontend: React.js, Prax, Flux, ReFlux, Lodash, SCSS, Stylific,
              Stylebox, Jade, Stylus, Yandex BEM, jQuery, Gulp, Webpack, Git, Jenkins.
            </li>
            <li>
              Backend: Node, Ruby, Java, Clojure, Spring Framework,
              Hibernate ORM, JavaEE (Glassfish, Weblogic), Servlets, Cassandra.
            </li>
            <li>
              Mobile: Android;
            </li>
          </ul>
        </div>
        <div className='bg-contain'
             style={{
               height: '5rem',
               backgroundImage: 'url(/images/react.svg)'
             }} />
        <div>
          <h2>We do:</h2>
          <ul className='color-text-light'>
            <li>
              Single page applications&nbsp;&mdash; using latest
              technologies and approaches;
            </li>
            <li>
              Continuous integration and delivery&nbsp;&mdash; build
              and deploy to&nbsp;production automatically;
            </li>
            <li>
              Functional programming&nbsp;&mdash; it&nbsp;lets&nbsp;us
              create complex applications without defects.
            </li>
          </ul>
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
          <CarouselItem pics={['tobox-0.png', 'tobox-1.png']}
                        id='ToBox' href='//tobox.com/' />
          <CarouselItem pics={['fiesta-0.jpg', 'fiesta-1.jpg']}
                        id='Ford Fiesta' href='//fiesta.ford.ru/' />
          <CarouselItem pics={['tpu-0.jpg', 'tpu-1.jpg']}
                        id='TPU Shop' href='//shop.tpu.ru/' />
          <CarouselItem pics={['ecosport-0.jpg']}
                        id='Ford EcoSport' href='//ecosport.ford.ru/' />
          <CarouselItem pics={['poi-0.jpg', 'poi-1.jpg']}
                        id='Just POI' href='//prostopoi.ru/' />
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
          <a href='mailto:yury.egorenkov@gmail.com'
             className='row-start-center children-margin-1-h'>
            <span className='icon icon-email color-primary' />
            <span>yury.egorenkov@gmail.com</span>
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
      </div>
    </div>
  )
}

function Form (__, {read, env}) {
  return (
    <div className='row-center-stretch margin-3-t'>
      <input type='email'
             placeholder='Enter your email'
             className='input width-24 shadow-in-divider rounded-l'
             {...bindValue(read, env, ['form', 'email'])} />
      <button className='button-primary rounded-r'
              {...bindPopup(env, 'form', true)}>
        Contact us
      </button>
    </div>
  )
}
