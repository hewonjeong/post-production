import React from 'react'
import { object } from 'prop-types'
import ListWrap from '../layout/ListWrap'
import Media from './Media'

const propTypes = { videos: object }
const defaultProps = { videos: {} }

const VideoList = ({ videos }) => {
  const entries = Object.entries(videos)
  return entries.length ? (
    <ListWrap>
      {entries.map(([id, video]) => (
        <Media {...video} key={id} />
      ))}
    </ListWrap>
  ) : (
    <p>파일을 추가하세요.</p>
  )
}

VideoList.propTypes = propTypes
VideoList.defaultProps = defaultProps

export default VideoList
