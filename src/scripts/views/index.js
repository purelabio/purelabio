import {Carousel, CarouselItem} from './carousel'

export function Index () {
  return (
    <div className='col-start-stretch padding-8-b'>
      <div className='container align-center'>
        <h1 className='margin-3-t'>
          Let&rsquo;s create something awesome<br />
          that your users will love
        </h1>
        <p className='color-text-light'>
          We&nbsp;are the consulting company of&nbsp;developers and designers,
          who work in&nbsp;close partnership with our customers create
          great products for web and mobile.
        </p>
        <form className='row-center-stretch margin-3-t'>
          <input type='email'
                 placeholder='Enter your email'
                 className='input width-24 shadow-in-divider rounded-l' />
          <button className='button-primary rounded-r'>Go!</button>
        </form>
      </div>
      <div className='container margin-5-t'>
        <div className='relative' style={{
          background: 'url(/images/macbook.svg) top center no-repeat',
          backgroundSize: 'contain',
          height: '383px'
        }} />
      </div>
      <div className='container margin-3-t children-margin-1x5-v'>
        <div>
          <h2>Навыки и технологии:</h2>
          <ul className='color-text-light'>
            <li>
              Front: React, git, ES2015, FP/FRP, SCSS,
              (Re)Flux/Redux, Unix/Linux, English (fluent);
            </li>
            <li>
              Mobile: Android;
            </li>
            <li>
              Backend: Ruby on Rails.
            </li>
          </ul>
        </div>
        <div className='bg-contain'
             style={{
               height: '5rem',
               backgroundImage: 'url(/images/react.svg)'
             }} />
        <div>
          <h2>Мы делаем:</h2>
          <ul className='color-text-light'>
            <li>
              Single page application — с применением самых
              современных технологий и подходов;
            </li>
            <li>
              Continuous integration vs delivery – автоматическая сборка
              и доставка на production;
            </li>
            <li>
              Functional Programming – это позволяет нам
              создавать сложные приложения без ошибок.
            </li>
          </ul>
        </div>
      </div>
      <div className='align-center margin-3-t children-margin-1x5-v'>
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
