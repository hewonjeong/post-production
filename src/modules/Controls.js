import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as metaActions from '../actions/metaActions'

const Controls = ({ isPlaying, play, pause }) => (
  <section style={style.controls}>
    <button onClick={isPlaying ? pause : play}>
      {isPlaying ? '일시정지' : '재생'}
    </button>
  </section>
)

const style = {
  controls: { position: 'absolute', bottom: 0 }
}

export default connect(
  ({ meta: { isPlaying } }) => ({ isPlaying }),
  dispatch => bindActionCreators(metaActions, dispatch)
)(Controls)
