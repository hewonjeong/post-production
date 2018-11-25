import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { cond, equals } from 'ramda'
import flow from 'lodash/fp/flow'
import sizes from '../constants/sizes'
import { getLastEnd } from '../selector/getTotal'

const Clip = ({ position, children }) => (
  <div style={{ ...style.clip, ...position }}>{children}</div>
)

const Track = ({ type, clips, assets, zoom, total, width, ...rest }) => {
  const { connectDropTarget, isOver, canDrop } = rest

  return connectDropTarget(
    <div style={style.track}>
      <div style={style.backdrop} />
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
            <Clip position={getPosition(clip, total)} key={key}>
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
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}

const mediaTarget = {
  drop: props => {
    console.log(props)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

export default flow(
  DropTarget('media', mediaTarget, collect),
  connect(({ assets, timeline, meta: { zoom } }, { type }) => {
    const clips = timeline[type]
    const total = getLastEnd(clips)
    return { clips, assets, zoom, total, width: zoom * total }
  })
)(Track)

/* helper */
const getPosition = ({ start, end }, total) => ({
  left: (start * 100) / total + '%',
  right: 100 - (end * 100) / total + '%'
})
