import React from 'react'
import { object } from 'prop-types'

const propTypes = { canvas: object }
const defaultProps = { canvas: {} }

const RATIO = 16 / 9
class Preview extends React.Component {
  componentDidMount() {
    const canvas = this.props.canvas.current
    const { width } = canvas.getBoundingClientRect()
    canvas.setAttribute('height', width / RATIO)
  }

  render() {
    return <canvas ref={this.props.canvas} />
  }
}

Preview.propTypes = propTypes
Preview.defaultProps = defaultProps

export default Preview
