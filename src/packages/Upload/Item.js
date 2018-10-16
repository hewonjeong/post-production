import React from 'react'
import { number, string, object } from 'prop-types'

const propTypes = { file: object, url: string, width: number }
const defaultProps = { file: object, url: '', width: 150 }

class Item extends React.Component {
  video = React.createRef()
  canvas = React.createRef()

  componentDidMount() {
    const video = this.getVideo()
    const canvas = this.getCanvas()
    this.ctx = canvas && canvas.getContext('2d')
    video.addEventListener('play', this.timerCallback, false)
  }

  componentWillUnmount() {
    const video = this.getVideo()
    video.removeEventListener('play', this.timerCallback, false)
  }

  getVideo = () => this.video.current
  getCanvas = () => this.canvas.current

  timerCallback = () => {
    const video = this.getVideo()
    const isPlaying = video && !(video.paused || video.ended)
    isPlaying && this.computeFrame()
    isPlaying && setTimeout(this.timerCallback, 0)
  }

  computeFrame = () => {
    const video = this.getVideo()
    this.ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
  }

  render() {
    const { file, url, width } = this.props

    const Video = () => {
      const videoConfig = {
        src: url,
        width,
        autoPlay: true,
        loop: true,
        controls: true,
        muted: true
      }

      return <video {...videoConfig} ref={this.video} />
    }

    const Title = () => (
      <h1 style={style.Title}>
        {file.name}
        <small>{getFileSizeString(file.size)}</small>
      </h1>
    )

    const Canvas = () => (
      <canvas width={width} height={(width * 9) / 16} ref={this.canvas} />
    )

    return (
      <article style={{ ...style, width }}>
        <Video />
        <Title />
        <Canvas />
      </article>
    )
  }
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

const style = {
  overflow: 'hidden',
  Title: { fontSize: 16, padding: 5, display: 'flex' }
}

export default Item

/* utils */
const getFileSizeString = number => {
  const kb = Math.round(number / 1024)
  const mb = Math.round((kb / 1000) * 10) / 10
  return mb < 1 ? kb + 'KB' : mb + 'MB'
}
