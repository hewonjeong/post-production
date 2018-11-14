import React from 'react'
import { connect } from 'react-redux'
import getTotal from '../selector/getTotal'

const Bar = ({ left }) => <div style={{ ...style, left }} />

const style = {
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 1
}

export default connect(({ timeline: { video }, meta: { current } }) => ({
  left: (current * 100) / getTotal(video) + '%'
}))(Bar)
