import React from 'react'
import { object } from 'prop-types'

const propTypes = { videos: object }
const defaultProps = { videos: {} }

const VideoList = ({ videos }) => (
  <ul style={style.ul}>
    {Object.entries(videos).map(([id, video]) => (
      <li style={style.li} key={id}>
        <img src={video.thumbnail} style={style.thumbnail} alt={id} />
      </li>
    ))}
  </ul>
)

VideoList.propTypes = propTypes
VideoList.defaultProps = defaultProps

const style = {
  ul: { display: 'flex', flexWrap: 'wrap', padding: 8 },
  li: { width: '50%', overflow: 'hidden', padding: 8 },
  thumbnail: { borderRadius: 4, maxWidth: '100%', backgroundColor: 'black' }
}

export default VideoList
