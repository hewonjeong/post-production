import React from 'react'

class Media extends React.Component {
  component = React.createRef()
  state = { width: 0 }

  componentDidMount() {
    const { width } = this.component.current.getBoundingClientRect()
    this.setState({ width })
  }

  getStyle = () => ({ ...style.component, height: (this.state.width * 9) / 16 })

  render() {
    const { thumbnail, filename, duration, overlay } = this.props
    return (
      <article style={this.getStyle()} ref={this.component}>
        <img src={thumbnail} alt={filename} style={style.image} />
        {overlay ? (
          <p style={style.overlay}>{overlay}</p>
        ) : (
          <>
            <h1 style={style.filename}>{filename}</h1>
            <p style={style.duration}>{Math.ceil(duration)}초</p>
          </>
        )}
      </article>
    )
  }
}

const absolute = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'hsla(0, 0%, 0%, .5)',
  color: 'white'
}

const flex = { display: 'flex', justifyContent: 'center', alignItems: 'center' }
const style = {
  component: { borderRadius: 4, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: 'auto' },
  filename: { ...absolute, top: 'auto' },
  duration: { ...absolute, bottom: 'auto', right: 'auto' },
  overlay: { ...absolute, ...flex }
}

export default Media
