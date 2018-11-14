import React from 'react'
import { connect } from 'react-redux'
import Track from './Track'
import Bar from './Bar'

const Timeline = ({ hasTracks }) => (
  <div style={style.timeline}>
    <section style={style.aside}>미디어 소스</section>
    <section style={style.tracks}>
      {hasTracks ? (
        <>
          <Track type="video" />
          <Bar />
        </>
      ) : (
        '미디어 소스를 끌어다 놓으세요.'
      )}
    </section>
  </div>
)

const style = {
  timeline: { height: '100%', display: 'flex' },
  aside: { width: 120, flex: 'none' },
  tracks: { position: 'relative', overflowX: 'auto' }
}

export default connect(({ timeline }) => ({
  hasTracks: Object.values(timeline).some(o => !!Object.keys(o).length)
}))(Timeline)
