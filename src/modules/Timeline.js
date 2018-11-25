import React from 'react'
import { connect } from 'react-redux'
import sizes from '../constants/sizes'
import Track from './Track'
import Ruler from './Ruler'
import Bar from './Bar'

const Timeline = ({ hasTracks }) => (
  <div style={style.timeline}>
    <section style={style.aside}>
      <div style={{ height: sizes.clip.height }}>미디어 소스</div>
      <div style={{ height: sizes.clip.height }}>오디오</div>
      <div style={{ height: sizes.clip.height }}>텍스트</div>
    </section>
    <section style={style.tracks}>
      <Ruler />
      <Track type="video" />
      <Track type="audio" />
      <Track type="text" />
      <Bar />
    </section>
  </div>
)

const style = {
  timeline: { height: '100%', display: 'flex' },
  aside: { width: 120, flex: 'none', paddingTop: 20 },
  tracks: { flex: 1, position: 'relative', overflowX: 'auto' }
}

export default connect(({ timeline }) => ({
  hasTracks: Object.values(timeline).some(o => !!Object.keys(o).length)
}))(Timeline)
