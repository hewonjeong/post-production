import React from 'react'
import { object } from 'prop-types'

const propTypes = { canvas: object }
const defaultProps = { canvas: {} }

const Preview = ({ canvas }) => (
  <section style={style.component}>
    <canvas ref={canvas} width="960" height="540" style={style.canvas} />
  </section>
)

Preview.propTypes = propTypes
Preview.defaultProps = defaultProps

const style = {
  component: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden'
  },

  canvas: {
    borderRadius: 4,
    maxWidth: '100%',
    maxHeight: '100%'
  }
}

export default Preview
