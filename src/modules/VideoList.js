import React from 'react'
import { object } from 'prop-types'
import uuidv4 from 'uuid/v4'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const propTypes = { videos: object }
const defaultProps = { videos: {} }

const VideoList = ({ videos, meta, addTimeline }) => {
  const entries = Object.entries(videos)
  return entries.length ? (
    <ListWrap>
      {entries.map(([key, video]) => {
        const onClick = () => {
          const clip = {
            videoKey: key,
            start: meta.total,
            end: meta.total + video.duration
          }
          addTimeline('video')({ [uuidv4()]: clip })
        }
        return <Media {...video} onClick={onClick} key={key} />
      })}
    </ListWrap>
  ) : (
    <p>파일을 추가하세요.</p>
  )
}

VideoList.propTypes = propTypes
VideoList.defaultProps = defaultProps

export default VideoList
