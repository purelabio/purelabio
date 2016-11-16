export class Carousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.goto(0)
  }

  nextIndex (max, index) {
    return index < max ? index + 1 : 0
  }

  prevIndex (max, index) {
    return index === 0 ? max : index - 1
  }

  goto (index) {
    this.setState({index})
  }

  gotoNext () {
    this.goto(this.nextIndex(_.size(this.props.children) - 1, this.state.index))
  }

  gotoPrev () {
    this.goto(this.prevIndex(_.size(this.props.children) - 1, this.state.index))
  }

  render () {
    const {children} = this.props

    if (!children) return null

    const index = this.state.index | 0
    const multipleChildren = _.isArray(children) && children.length > 1

    return (
      <div className='container-wide children-margin-1x5-v'>
        <div className='row-between-center'>
          {multipleChildren ?
            <button className='button-primary sm-hide' onClick={this.gotoPrev.bind(this)}>
              <span className='row-center-center padding-0x25-v'>
                <span className='icon icon-arrow-left' />
              </span>
            </button>
          : null}
          <div className='container' style={{padding: '0'}}>
            <div className='overflow-hidden row-start-center'>
              <div className='flex-1 row-start-stretch flex-shrink-0 slide-transition'
                   style={{transform: `translateX(-${100 * index}%)`, height: '24rem'}}>
                {children}
              </div>
            </div>
          </div>
          {multipleChildren ?
            <button className='button-primary sm-hide' onClick={this.gotoNext.bind(this)}>
              <span className='row-center-center padding-0x25-v'>
                <span className='icon icon-arrow-right' />
              </span>
            </button>
          : null}
        </div>
        {multipleChildren ?
          <div className='row-center-center children-margin-0x5-h'>
            {_.times(children.length, i => (
              <button type='button'
                      style={{width: '0.75rem', height: '0.75rem', padding: '0'}}
                      className={`button shadow-in-primary circle outline-0
                                  ${i === index ? 'bg-primary' : 'bg-white'}`}
                      onClick={() => {this.goto(i)}}
                      key={i}
                      />
            ))}
          </div>
        : null}
      </div>
    )
  }
}

export function CarouselItem ({pics, name, href}) {
  return (
    <div className='relative width-100p flex-shrink-0 row-start-stretch'>
      <div className='flex-1 row-between-stretch children-margin-1-h'>
        {_.map(pics, pic => (
          <div className='flex-1 col-start-stretch bg-primary padding-0x25' key={pic}>
            <div className='flex-1 bg-wide'
                 style={{backgroundImage: `url(/images/projects/${pic})`}} />
          </div>
        ))}
      </div>
      <a href={href} target='_blank'
         className='abs-t-l abs-b-r col-center-center opacity-0 hover-opacity-0x9
                    bg-primary undecorated color-hover-white transition-all'>
        {name}
      </a>
    </div>
  )
}
