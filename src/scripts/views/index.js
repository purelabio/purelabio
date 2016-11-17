import {bindValue, bindPopup} from '../utils/utils'
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
          We&nbsp;are the consulting company of&nbsp;developers and designers,
          who work in&nbsp;close partnership with our customers create
          great products for web and mobile.
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
      <a name='whoweare' />
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
      <a name='portfolio' />
      <div className='align-center children-margin-1x5-v'>
        <h2>Our projects</h2>
        <Carousel>
          <CarouselItem pics={['tobox-0.png', 'tobox-1.png']}
                        name='ToBox' href='//tobox.com/' />
          <CarouselItem pics={['fiesta-0.jpg', 'fiesta-1.jpg']}
                        name='Ford Fiesta' href='//fiesta.ford.ru/' />
          <CarouselItem pics={['tpu-0.jpg', 'tpu-1.jpg']}
                        name='TPU Shop' href='//shop.tpu.ru/' />
          <CarouselItem pics={['ecosport-0.jpg']}
                        name='Ford EcoSport' href='//ecosport.ford.ru/' />
          <CarouselItem pics={['poi-0.jpg', 'poi-1.jpg']}
                        name='Just POI' href='//prostopoi.ru/' />
        </Carousel>
      </div>
    </div>
  )
}

function Contacts () {
  return (
    <div>
      <a name='contacts' />
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
             {...bindValue(read, env, ['email'])} />
      <button className='button-primary rounded-r'
              {...bindPopup(env, 'form', true)}>
        Write us
      </button>
    </div>
  )
}
