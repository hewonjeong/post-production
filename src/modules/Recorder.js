import React from 'react'

class Recorder extends React.Component {
  state = { recordedBlobs: [], mediaRecorder: {}, isReady: false }

  componentDidUpdate(prevProps) {
    const started = !prevProps.isPlaying && this.props.isPlaying
    const ended = prevProps.isPlaying && !this.props.isPlaying
    started && this.startCapture()
    ended && this.state.mediaRecorder.stop()
  }

  startCapture = () => {
    const stream = this.props.canvas.captureStream(24)
    const options = { mimeType: 'video/webm' }
    const mediaRecorder = new MediaRecorder(stream, options)
    this.setState({ mediaRecorder })
    mediaRecorder.onstop = this.handleStop
    mediaRecorder.ondataavailable = this.handleDataAvailable
    mediaRecorder.start()
  }

  handleDataAvailable = event => {
    event.data.size > 0 &&
      this.setState(prev => ({
        recordedBlobs: [...prev.recordedBlobs, event.data],
        isReady: true
      }))
  }

  getURL = () => {
    const { recordedBlobs } = this.state
    const blob = new Blob(recordedBlobs, { type: 'video/webm' })
    return URL.createObjectURL(blob)
  }

  render() {
    const url = this.getURL()
    return (
      <div style={style.component}>
        {this.state.isReady ? (
          <>
            <video src={url} style={style.video} autoPlay loop controls />
            <a href={url} download="video.webm" style={style.download}>
              Download
            </a>
          </>
        ) : (
          'Recording...'
        )}
      </div>
    )
  }
}

const style = {
  component: { padding: 16 },
  video: { borderRadius: 4 },
  download: { color: 'white', textDecoration: 'none', marginTop: 8 }
}

export default Recorder
