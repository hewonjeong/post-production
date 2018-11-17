import React from 'react'
import { connect } from 'react-redux'
import { cond, equals } from 'ramda'
import sizes from '../constants/sizes'
import { getLastEnd } from '../selector/getTotal'

const Clip = ({ position, children }) => (
  <div style={{ ...style.clip, ...position }}>{children}</div>
)

const Track = ({ type, clips, assets, zoom, total, width }) => (
  <div style={{ ...style.track, width }}>
    {Object.entries(clips).map(([key, clip]) => {
      const clipContent = cond([
        [
          equals('video'),
          () =>
            assets[clip.videoKey].images
              .filter((_, index) => !(index % (sizes.clip.width / zoom)))
              .map((url, index) => (
                <img src={url} alt="" height={sizes.clip.height} key={index} />
              ))
        ],
        [
          equals('text'),
          () => (
            <article style={{ width: '100%' }}>
              <p style={style.text}>
                <strong>{clip.text[0]}</strong>
              </p>
              <p style={style.text}>{clip.text[1]}</p>
            </article>
          )
        ]
      ])(type)

      return (
        <Clip position={getPosition(clip, type, total)} key={key}>
          {clipContent}
        </Clip>
      )
    })}
  </div>
)

const style = {
  track: { position: 'relative' },

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
    overflow: ' hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}

export default connect(({ assets, timeline, meta: { zoom } }, { type }) => {
  const clips = timeline[type]
  const total = getLastEnd(clips)
  return { clips, assets, zoom, total, width: zoom * total }
})(Track)

/* helper */
const getPosition = ({ start, end }, type, total) => ({
  left: (start * 100) / total + '%',
  right: 100 - (end * 100) / total + '%',
  top: ['video', 'audio', 'text'].indexOf(type) * sizes.clip.height
})
