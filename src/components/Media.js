import React, { memo, useState, useEffect, useRef } from 'react'
import { DragSource } from 'react-dnd'

const Image = memo(({ src }) => <img src={src} alt="" style={style.image} />)

const Media = ({ thumbnail, filename, duration, overlay, ...rest }) => {
  const { onClick, connectDragSource, isDragging } = rest
  const getStyle = () => ({ ...style.component, height: (width * 9) / 16 })
  const component = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const { width } = component.current.getBoundingClientRect()
    setWidth(width)
  })

  return (
    <article ref={component} style={getStyle()} onClick={onClick}>
      {connectDragSource(
        <div>
          <Image src={thumbnail} />
          {overlay ? (
            <p style={style.overlay}>{overlay}</p>
          ) : (
            <>
              <h1 style={style.filename}>{filename}</h1>
              <p style={style.duration}>
                {duration && Math.ceil(duration) + '초'}
              </p>
            </>
          )}
        </div>
      )}
    </article>
  )
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
  component: {
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  },
  image: { width: '100%', height: 'auto' },
  filename: { ...absolute, top: 'auto' },
  duration: { ...absolute, bottom: 'auto', right: 'auto' },
  overlay: { ...absolute, ...flex }
}

const mediaSource = {
  beginDrag: props => {
    console.log(props)
    return props
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('media', mediaSource, collect)(Media)
