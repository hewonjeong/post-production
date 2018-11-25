import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { cond, equals } from 'ramda'
import flow from 'lodash/fp/flow'
import * as timelineActions from '../actions/timelineActions'
import sizes from '../constants/sizes'
import { getLastEnd } from '../selector/getTotal'

const Clip = ({ style: variant, children }) => (
  <div style={{ ...style.clip, ...variant }}>{children}</div>
)

const Track = ({ type, clips, assets, zoom, total, width, ...rest }) => {
  const { connectDropTarget, isOver, canDrop } = rest
  const backgroundColor = isOver ? (canDrop ? 'green' : 'red') : 'black'

  return connectDropTarget(
    <div style={style.track}>
      <div style={{ ...style.backdrop, backgroundColor }} />
      <div style={{ ...style.clips, width }}>
        {Object.entries(clips).map(([key, clip]) => {
          const renderVideoClip = () =>
            assets[clip.videoKey].images
              .filter((_, index) => !(index % (sizes.clip.width / zoom)))
              .map((url, index) => (
                <img src={url} alt="" height={sizes.clip.height} key={index} />
              ))

          const renderTextClip = () => (
            <article style={{ width: '100%' }}>
              <p style={style.text}>
                <strong>{clip.text[0]}</strong>
              </p>
              <p style={style.text}>{clip.text[1]}</p>
            </article>
          )

          const clipContent = cond([
            [equals('video'), renderVideoClip],
            [equals('text'), renderTextClip]
          ])(type)

          return (
            <Clip
              style={{
                left: (100 * clip.start) / total + '%',
                width: (clip.end - clip.start) * zoom
              }}
              key={key}
            >
              {clipContent}
            </Clip>
          )
        })}
      </div>
    </div>
  )
}

const style = {
  track: { position: 'relative', height: sizes.clip.height },
  clips: { position: 'absolute' },

  clip: {
    position: 'absolute',
    display: 'flex',
    flexWrap: 'nowrap',
    border: '3px solid orange',
    borderRadius: 4,
    height: sizes.clip.height,
    overflow: 'hidden'
  },

  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}

const trackTarget = {
  canDrop: (props, monitor) => {
    const item = monitor.getItem()
    return props.type === item.type
  },
  drop: (props, monitor) => {
    const item = monitor.getItem()
    const start =
      props.type === 'video'
        ? props.total
        : (monitor.getClientOffset().x - sizes.timeline.offset) / 40
    const clip = item.getClip(start)
    props.addClip({ type: props.type, clip })
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

export default flow(
  DropTarget('media', trackTarget, collect),
  connect(
    ({ assets, timeline, meta: { zoom } }, { type }) => {
      const clips = timeline[type]
      const total = getLastEnd(clips)
      return { clips, assets, zoom, total, width: zoom * total }
    },
    dispatch => bindActionCreators(timelineActions, dispatch)
  )
)(Track)
