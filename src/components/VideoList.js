import React from 'react'
import { object } from 'prop-types'
import ListWrap from '../layout/ListWrap'
import Media from './Media'

const propTypes = { videos: object }
const defaultProps = { videos: {} }

const VideoList = ({ videos }) => (
  <ListWrap>
    {Object.entries(videos).map(([id, video]) => (
      <Media thumbnail={video.thumbnail} key={id} />
    ))}
  </ListWrap>
)

VideoList.propTypes = propTypes
VideoList.defaultProps = defaultProps

export default VideoList
