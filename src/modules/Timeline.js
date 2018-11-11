import React from 'react'
import Track from './Track'
import { Consumer } from '../App'

const Timeline = () => (
  <Consumer>
    {({ assets, timeline, meta }) => {
      const zoom = 40
      const totalWidth = zoom * meta.total
      const props = { assets, zoom, total: meta.total, width: totalWidth }
      const isValid = Object.values(timeline).some(o => !!Object.keys(o).length)
      return (
        <div style={style.timeline}>
          <section style={style.aside}>미디어 소스</section>
          <section style={style.tracks}>
            {isValid ? (
              <>
                <Track clips={timeline.video} {...props} />
                <div style={style.bar(meta)} />
              </>
            ) : (
              '미디어 소스를 끌어다 놓으세요.'
            )}
          </section>
        </div>
      )
    }}
  </Consumer>
)

const style = {
  timeline: { height: '100%', display: 'flex' },
  aside: { width: 120, flex: 'none' },
  tracks: { position: 'relative', overflowX: 'auto' },
  bar: ({ current, total }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: (current * 100) / total + '%',
    width: 1,
    backgroundColor: 'white'
  })
}

export default Timeline
