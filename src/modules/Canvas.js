import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VideoContext from 'videocontext'
import * as metaActions from '../actions/metaActions'
import * as recordActions from '../actions/recordActions'
import getTotal from '../selector/getTotal'
import filters from '../effects/filters'
import transitionsList from '../effects/transitions'
import TextCanvas from './TextCanvas'

const Canvas = ({ assets, timeline, transitions, meta, total, ...rest }) => {
  const { pause, setCurrent } = rest
  const [textCanvas, setTextCanvas] = useState({})
  const [recordedBlobs, setBlobs] = useState([])
  const [record, setRecord] = useState('idle')
  const { timestamp, isPlaying, current } = meta
  const canvasRef = useRef()
  const ctx = useRef()
  const raf = useRef()
  const mediaRecorder = useRef()

  const init = () => {
    ctx.current = new VideoContext(canvasRef.current)
    ctx.current.registerCallback('ended', stop)
  }

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
      try {
        init()

        const connectVideo = ([key, clip, transition]) => {
          const videoNode = ctx.current.video(assets[clip.videoKey].url)
          videoNode.start(clip.start)
          videoNode.stop(clip.end)
          transition
            ? videoNode.connect(transition)
            : videoNode.connect(ctx.current.destination)
          clip.filter && filters[clip.filter] && connectFilter(clip, videoNode)
        }

        const connectFilter = (clip, videoNode) => {
          const filter = ctx.current.effect(filters[clip.filter])
          filter.outputMix = [1.25, 1.18, 0.9]
          videoNode.connect(filter)
          filter.connect(ctx.current.destination)
        }

        const connectTransition = ([key, transition]) => {
          const t = ctx.current.transition(transitionsList[transition.name])
          const prevVideo = timeline.video[transition.prev]
          const nextVideo = timeline.video[transition.next]
          t.transition(nextVideo.start, prevVideo.end, 0.0, 1.0, 'mix')
          connectVideo([transition.prev, prevVideo, t])
          connectVideo([transition.next, nextVideo, t])
          t.connect(ctx.current.destination)
        }

        const connectCanvas = ([key, clip]) => {
          const canvasNode = ctx.current.canvas(textCanvas[key])
          canvasNode.connect(ctx.current.destination)
          canvasNode.start(clip.start)
          canvasNode.stop(clip.end)
        }

        const noTransition = ([key]) => {
          const inTransition = ({ prev, next }) => [prev, next].includes(key)
          return Object.values(transitions).findIndex(inTransition) === -1
        }

        const { video, text } = timeline
        Object.entries(video)
          .filter(noTransition)
          .forEach(connectVideo)
        Object.entries(transitions).forEach(connectTransition)
        Object.entries(text).forEach(connectCanvas)
      } catch (error) {
        console.group('VideoContext Error')
        console.error(error)
        console.groupEnd()
      }
    },
    [timestamp, textCanvas]
  )

  useEffect(
    () => {
      const next = isPlaying
        ? () => {
            startRecord()
            syncCurrent()
            ctx.current.play()
          }
        : () => {
            stopRecord()
            cancelSync()
            ctx.current.pause()
          }
      next()
    },
    [isPlaying]
  )

  const startRecord = () => {
    setBlobs([])
    setRecord('loading')
    rest.setURL('')
    const stream = canvasRef.current.captureStream(24)
    const options = { mimeType: 'video/webm' }
    mediaRecorder.current = new MediaRecorder(stream, options)
    mediaRecorder.current.ondataavailable = event =>
      event.data.size > 0 && handleDataAvailable(event.data)
    mediaRecorder.current.start()
  }

  const stopRecord = () => {
    mediaRecorder.current && mediaRecorder.current.stop()
  }

  const handleDataAvailable = blob => {
    setBlobs([blob])
    setRecord('success')
  }

  const getURL = () => {
    const blob = new Blob(recordedBlobs, { type: 'video/webm' })
    return URL.createObjectURL(blob)
  }

  useEffect(
    () => {
      record === 'success' && rest.setURL(getURL())
    },
    [record]
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
  ({ assets, timeline, transitions, meta }) => ({
    assets,
    timeline,
    transitions,
    meta,
    total: getTotal(timeline)
  }),
  dispatch => bindActionCreators({ ...metaActions, ...recordActions }, dispatch)
)(Canvas)
