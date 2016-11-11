export function Index () {
  const coverStyle = {
    backgroundImage: 'url(/images/bg.jpg)',
    opacity: '0.15'
  }

  return (
    <div className='container row-start-stretch flex-1
                    children-margin-2x5-h bg-primary relative'>
      <div className='bg-cover abs-t-l abs-b-r' style={coverStyle} />
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
        <a className='button-white pointer'>See what we've made</a>
      </div>
    </div>
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
