import React from 'react'

const THUMB_WIDTH = 80
const THUMB_HEIGHT = 45

const Clip = ({ images, position }) => (
  <div style={{ ...style.clip, ...position }}>
    {images.map((url, index) => (
      <img src={url} alt="" height={THUMB_HEIGHT} key={index} />
    ))}
  </div>
)

const Track = ({ clips, assets, zoom, total, width }) => (
  <div style={{ ...style.track, width }}>
    {Object.entries(clips).map(([key, clip]) => (
      <Clip
        images={assets[clip.videoKey].images.filter(
          (_, index) => !(index % (THUMB_WIDTH / zoom))
        )}
        position={getPosition(clip, total)}
        key={key}
      />
    ))}
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
    overflow: 'hidden'
  }
}

export default Track

/* helper */
const getPosition = ({ start, end }, total) => ({
  left: (start * 100) / total + '%',
  right: 100 - (end * 100) / total + '%'
})
