import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as metaActions from '../actions/metaActions'

const Controls = ({ isPlaying, play, pause }) => (
  <button onClick={isPlaying ? pause : play}>
    {isPlaying ? '일시정지' : '재생'}
  </button>
)

export default connect(
  ({ meta: { isPlaying } }) => ({ isPlaying }),
  dispatch => bindActionCreators(metaActions, dispatch)
)(Controls)
