import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoContext from 'videocontext'
import * as metaActions from '../actions/metaActions'
import getTotal from '../selector/getTotal'
import TextCanvas from './TextCanvas'

const Canvas = ({ timeline, assets, meta, total, pause, setCurrent }) => {
  const [textCanvas, setTextCanvas] = useState({})
  const { timestamp, isPlaying, current } = meta
  const canvasRef = useRef()
  const ctx = useRef()
  const raf = useRef()

  const stop = () => {
    pause()
    setCurrent(0)
    ctx.current.currentTime = 0
  }

  const syncCurrent = () => {
    const condition = isPlaying && current < total
    setCurrent(ctx.current.currentTime)
    condition && (raf.current = requestAnimationFrame(syncCurrent))
  }

  const cancelSync = () => {
    cancelAnimationFrame(raf.current)
  }

  useEffect(
    () => {
      ctx.current = new VideoContext(canvasRef.current)
      ctx.current.registerCallback('ended', stop)
    },
    [canvasRef]
  )

  useEffect(
    () => {
      isPlaying ? ctx.current.play() : ctx.current.pause()
      isPlaying ? syncCurrent() : cancelSync()
    },
    [isPlaying]
  )

  useEffect(
    () => {
      Object.values(timeline.video).forEach(clip => {
        const videoNode = ctx.current.video(assets[clip.videoKey].url)
        videoNode.connect(ctx.current.destination)
        videoNode.start(clip.start)
        videoNode.stop(clip.end)
      })

      Object.entries(timeline.text).forEach(([key, clip]) => {
        const canvasNode = ctx.current.canvas(textCanvas[key])
        canvasNode.connect(ctx.current.destination)
        canvasNode.start(clip.start)
        canvasNode.stop(clip.end)
      })
    },
    [timestamp, textCanvas]
  )

  return (
    <>
      <canvas ref={canvasRef} width="960" height="540" style={style} />
      {Object.entries(timeline.text).map(([key, clip]) => {
        const handleFill = ref => setTextCanvas({ ...textCanvas, [key]: ref })
        return <TextCanvas {...clip} onFill={handleFill} key={key} />
      })}
    </>
  )
}

const style = { borderRadius: 4, maxWidth: '100%', maxHeight: '100%' }

export default connect(
  ({ assets, timeline, meta }) => ({
    assets,
    timeline,
    meta,
    total: getTotal(timeline)
  }),
  dispatch => bindActionCreators(metaActions, dispatch)
)(Canvas)
