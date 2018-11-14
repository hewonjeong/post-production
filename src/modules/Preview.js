import React from 'react'
import Canvas from './Canvas'
import Controls from './Controls'

const Preview = () => (
  <section style={style}>
    <Canvas />
    <Controls />
  </section>
)

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  overflow: 'hidden'
}

export default Preview
