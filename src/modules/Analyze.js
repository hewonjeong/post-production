import React, { Component, createRef } from 'react'
import { equals } from 'ramda'
import Media from '../components/Media'

class Analyze extends Component {
  video = createRef()
  canvas = createRef()
  state = { thumbnail: '', images: [], duration: 0 }

  componentDidMount() {
    const video = this.getVideo()
    video.addEventListener('loadedmetadata', this.getDuration)
    video.addEventListener('timeupdate', this.capture)
  }

  componentWillUnmount() {
    const video = this.getVideo()
    video.removeEventListener('loadedmetadata', this.getDuration)
    video.removeEventListener('timeupdate', this.capture)
  }

  componentDidUpdate(prevProps, prevState) {
    const validate = ({ thumbnail, images, duration }) => {
      const hasCollectedImages =
        this.props.skipCollectingImages || images.length === Math.ceil(duration)
      return !!thumbnail && !!duration && hasCollectedImages
    }

    const isUpdated = !equals(this.state, prevState)
    const isValid = validate(this.state)
    isUpdated && isValid && this.props.onAnalyze(this.state)
  }

  getVideo = () => this.video.current
  getCanvas = () => this.canvas.current

  getDuration = () => {
    const video = this.getVideo()
    const { duration } = video
    this.setState({ duration })
    video.currentTime = 0
  }

  capture = () => {
    const fn = blob => {
      this.setState(prev => {
        const image = URL.createObjectURL(blob)
        return Object.assign(
          { images: [...prev.images, image] },
          currentTime === 0 && { thumbnail: image }
        )
      })
    }

    const video = this.getVideo()
    const canvas = this.getCanvas()
    const { duration, currentTime } = video
    toBlob(video, canvas, fn)

    const next = !this.props.skipCollectingImages && currentTime + 1 <= duration
    next && video.currentTime++
  }

  getPercent = () => {
    const { images, duration } = this.state
    const percent = Math.floor((images.length * 100) / Math.ceil(duration)) || 0
    return percent + '%'
  }

  render() {
    const { thumbnail } = this.state
    const video = this.getVideo()

    return (
      <>
        <Media thumbnail={thumbnail} overlay={this.getPercent()} />
        <video ref={this.video} src={this.props.url} hidden />
        <canvas ref={this.canvas} hidden />
      </>
    )
  }
}

export default Analyze

/* canvas */
const toBlob = (video, canvas, callback) => {
  const { videoWidth, videoHeight } = video
  canvas.setAttribute('width', videoWidth)
  canvas.setAttribute('height', videoHeight)
  canvas.getContext('2d').drawImage(video, 0, 0, videoWidth, videoHeight)
  canvas.toBlob(callback)
}
