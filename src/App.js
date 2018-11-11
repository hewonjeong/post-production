import React from 'react'
import { cond, equals } from 'ramda'
import VideoContext from 'videocontext'
import Layout from './layout/Layout'
import Preview from './modules/Preview'
import Panel from './modules/Panel'
import Timeline from './modules/Timeline'

export const { Provider, Consumer } = React.createContext()
class App extends React.Component {
  canvas = React.createRef()

  state = {
    assets: {},
    timeline: { video: {}, audio: {}, title: {} },
    meta: { total: 0, current: 0, isPlaying: false }
  }

  componentDidMount() {
    this.initCanvas()
  }

  componentDidUpdate(prevProps, prevState) {
    !equals(prevState.timeline, this.state.timeline) && this.updateTimeline()
  }

  getNextState = (key, nextState) => prev => {
    const next = cond([
      [equals('object'), () => nextState],
      [equals('function'), () => nextState(prev[key])]
    ])(typeof nextState)
    return { [key]: { ...prev[key], ...next } }
  }

  setTimeline = (nextState, callback = () => {}) => {
    this.setState(this.getNextState('timeline', nextState), callback)
  }

  setMeta = (nextState, callback = () => {}) => {
    this.setState(this.getNextState('meta', nextState), callback)
  }

  addAssets = assets => {
    this.setState(prev => ({ assets: { ...prev.assets, ...assets } }))
  }

  addTimeline = type => object => {
    this.setTimeline(prev => ({ [type]: { ...prev[type], ...object } }))
  }

  initCanvas = () => {
    this.ctx = new VideoContext(this.canvas.current)
    this.ctx.registerCallback('ended', this.resetCanvas)
  }

  resetCanvas = () => {
    this.ctx.currentTime = 0
    this.setMeta({ current: 0, isPlaying: false })
  }

  updateTimeline = () => {
    this.setMeta(
      { total: getTotalEnd(this.state.timeline.video) },
      this.updateCanvas
    )
  }

  updateCanvas = () => {
    const { ctx } = this
    const { assets } = this.state
    const { video } = this.state.timeline

    this.resetCanvas()
    Object.values(video).forEach(clip => {
      const videoNode = ctx.video(assets[clip.videoKey].url)
      videoNode.connect(ctx.destination)
      videoNode.start(clip.start)
      videoNode.stop(clip.end)
    })
  }

  handlePlay = () => {
    this.setMeta({ isPlaying: true }, this.play)
  }

  play = () => {
    this.ctx.play()
    cancelAnimationFrame(this.request)
    this.setCurrentTime()
  }

  handlePause = () => {
    this.setMeta({ isPlaying: false }, this.pause)
  }

  pause = () => {
    this.ctx.pause()
  }

  setCurrentTime = () => {
    const { ctx } = this
    this.setMeta({ current: ctx.currentTime }, () => {
      const { current, total, isPlaying } = this.state.meta
      const request = isPlaying && current < total
      request && (this.request = requestAnimationFrame(this.setCurrentTime))
    })
  }

  render() {
    const value = {
      ...this.state,
      canvas: this.canvas.current,
      addAssets: this.addAssets,
      addTimeline: this.addTimeline
    }

    const props = {
      ...this.state.meta,
      canvasRef: this.canvas,
      onPlay: this.handlePlay,
      onPause: this.handlePause
    }

    return (
      <Provider value={value}>
        <Layout
          content={<Preview {...props} />}
          aside={<Panel />}
          footer={<Timeline />}
        />
      </Provider>
    )
  }
}

export default App

/* helper */
const getTotalEnd = object => {
  const values = Object.values(object).map(o => o.end)
  return values.length ? Math.max(...values) : 0
}
