export function Index () {
  return (
    <div className='col-start-stretch padding-8-b'>
      <div className='container align-center'>
        <h1 className='margin-3-t'>
          Let&rsquo;s create something awesome<br />
          that your users will love.
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
          <button className='button rounded-r'>Go!</button>
        </form>
      </div>
      <div className='container-wide margin-5-t' style={{
        background: 'url(/images/macbook.svg) top center no-repeat',
        backgroundSize: 'contain',
        height: '500px'
      }} />
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
      <div className='container-wide margin-3-t children-margin-1x5-v align-center'>
        <div className='children-margin-1-v'>
          <div className='row-start-stretch children-margin-1-h'>
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
          </div>
          <div className='row-start-stretch children-margin-1-h'>
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectItem () {
  return (
    <a href='#' className='col-between-stretch shadow-in-divider rounded overflow-hidden
                           padding-0x5 children-margin-0x5-v color-text undecorated'>
      <img src='/images/tobox.png' alt='' className='width-100p' />
      <span className='font-3 align-center'>Tobox</span>
    </a>
  )
}
