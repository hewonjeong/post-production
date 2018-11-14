import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoContext from 'videocontext'
import * as metaActions from '../actions/metaActions'
import getTotal from '../selector/getTotal'

const Canvas = ({ video, assets, timestamp, isPlaying, current, ...rest }) => {
  const { total, pause, setCurrent } = rest
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
      Object.values(video).forEach(clip => {
        const videoNode = ctx.current.video(assets[clip.videoKey].url)
        videoNode.connect(ctx.current.destination)
        videoNode.start(clip.start)
        videoNode.stop(clip.end)
      })
    },
    [timestamp]
  )

  return <canvas ref={canvasRef} width="960" height="540" style={style} />
}

const style = { borderRadius: 4, maxWidth: '100%', maxHeight: '100%' }

export default connect(
  ({
    assets,
    timeline: { video },
    meta: { timestamp, isPlaying, current }
  }) => ({
    video,
    assets,
    timestamp,
    isPlaying,
    current,
    total: getTotal(video)
  }),
  dispatch => bindActionCreators(metaActions, dispatch)
)(Canvas)
