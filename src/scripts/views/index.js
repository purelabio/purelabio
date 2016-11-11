export function Index () {
  return (
    <div>
      <Section name='index' className='col-start-stretch bg-primary'>
        <MainSection />
      </Section>
      <Section name='whoweare' className='col-start-stretch bg-primary'>
        <WhoWeAre />
      </Section>
    </div>
  )
}

function Section ({children, className, name, ...props}) {
  return (
    <section className={`container relative col-start-stretch
                         padding-3x5-t bg-primary ${className || ''}`}
             style={{minHeight: '100vh'}} {...props}>
      <a name={name} className='abs-t' />
      {children}
    </section>
  )
}

function Slider () {
  return (
    <div className='bg-white margin-2-v rounded overflow-hidden'>
      <div className='row-start-center children-margin-0x25-h padding-0x5
                      shadow-in-dark-b'>
        <span className='width-0x5 circle-cover bg-primary-dark' />
        <span className='width-0x5 circle-cover bg-primary-dark' />
        <span className='width-0x5 circle-cover bg-primary-dark' />
      </div>
      <img src='/images/tobox.png' alt='ToBox' className='block-100p' />
      <div className='padding-0x25 shadow-in-dark-t' />
    </div>
  )
}

function Form () {
  return (
    <form className='col-start-stretch rounded bg-primary
                     margin-1 padding-1 children-margin-1-v'>
      <input placeholder='Name' className='input' />
      <input placeholder='Email' className='input' />
      <button className='button'>Send</button>
    </form>
  )
}

function MainSection () {
  const coverStyle = {
    backgroundImage: 'url(/images/bg.jpg)',
    opacity: '0.15'
  }

  return (
    <div className='col-start-stretch flex-1 bg-primary'>
      <div className='bg-cover abs-t-l abs-b-r' style={coverStyle} />
      <div className='row-start-stretch flex-1 children-margin-2x5-h'>
        <div className='flex-3 col-center-stretch color-white relative'>
          <h1>Let&rsquo;s create something that your users will love.</h1>
          <p className='font-4'>
            We&nbsp;are the consulting company of&nbsp;developers and designers,
            who work in&nbsp;close partnership with our customers create
            great products for web and mobile.
          </p>
        </div>
        <div className='flex-3 col-center-center padding-1-h bg-primary-dark relative'>
          <Slider />
          <a href='#whoweare' className='button-white pointer'>See what we've made</a>
        </div>
      </div>
    </div>
  )
}

function WhoWeAre () {
  return (
    <div className='col-start-stretch padding-1-b color-white'>
      <h2>Who we are</h2>
      <p>
        Команда профессиональных разработчиков ищет проекты по&nbsp;созданию
        веб сайтов. Мы&nbsp;владеем всеми необходимыми знаниями и&nbsp;навыками
        для создания современных, single page application, динамических
        веб приложений. Работаем быстро, аккуратно, тесно контактируем с&nbsp;заказчиком,
        в&nbsp;процессе работы обязательно отвечаем на&nbsp;письма и&nbsp;звонки.
      </p>
      <h3>Навыки и&nbsp;технологии:</h3>
      <ol>
        <li>
          1. Front: React, git, ES2015, FP/FRP, SCSS,
          (Re)Flux/Redux, Unix/Linux, English (fluent);
        </li>
        <li>2. Mobile: Android;</li>
        <li>3. Backend: Ruby on&nbsp;Rails.</li>
      </ol>
      <h3>Мы&nbsp;делаем</h3>
      <ul>
        <li>
          Single page application&nbsp;&mdash; с&nbsp;применением самых
          современных технологий и&nbsp;подходов;
        </li>
        <li>
          Continuous integration vs&nbsp;delivery&nbsp;&mdash; автоматическая
          сборка и&nbsp;доставка на&nbsp;production;
        </li>
        <li>
          Functional Programming&nbsp;&mdash; это позволяет нам создавать
          сложные приложения без ошибок.
        </li>
      </ul>
      <p>Наш основной продукт, который является предметом гордости можно посмотреть тут:</p>
      <p>
        http://tobox.com&nbsp;&mdash; самая быстрая и&nbsp;красивая на&nbsp;сегодняшний
        день интернет площадка для магазинов рунета.
      </p>
      <p>
        Мы&nbsp;работаем итеративно и&nbsp;итерационно. Это обозначает, что почти
        с&nbsp;самого начала проекта и&nbsp;в&nbsp;каждый момент времени заказчик
        имеет полностью рабочую версию продукта. Функции добавляются по&nbsp;одной.
        Каждая функция улучшается до&nbsp;тех пор, пока не&nbsp;удовлетворяет заказчика.
      </p>
      <p>
        Мы&nbsp;работаем с&nbsp;официальным договором авторского заказа с&nbsp;отчуждением
        исключительных прав, с&nbsp;предоплатой за&nbsp;очередную и&nbsp;последнюю итерации.
        Итерация имеет длину одну неделю. Она начинается с&nbsp;постановки целей
        и&nbsp;завершается сдачей результатов.
      </p>
      <p>
        Стоимость разрабочика 20$/час. Возможны гибкие условия, как полная загрузка
        на&nbsp;проекте, так и&nbsp;частичная в&nbsp;зависимости от&nbsp;ваших требований,
        сроков и&nbsp;бюджета.
      </p>
      <p>
        Если вас заинтересовало сотрудничество с&nbsp;нами, пишите и&nbsp;мы&nbsp;договоримся
        о&nbsp;skype звонке, что&nbsp;бы обсудить детали начала работ.
      </p>
      <p>С&nbsp;уважением, Юрий Егоренков</p>
    </div>
  )
}
