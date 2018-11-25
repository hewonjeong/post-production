import React from 'react'

const Bar = ({ left, backgroundColor = 'white' }) => (
  <div style={{ ...style, backgroundColor, left }} />
)

const style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 1
}

export default Bar
