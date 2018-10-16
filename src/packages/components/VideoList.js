import React from 'react'
import { arrayOf, instanceOf } from 'prop-types'
import VideoItem from './VideoItem'

const propTypes = { list: arrayOf(instanceOf(File)) }
const defaultProps = { list: [] }

const VideoList = ({ list }) => (
  <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 8 }}>
    {list.map((file, index) => (
      <li style={{ width: '50%', overflow: 'hidden', padding: 8 }} key={index}>
        <VideoItem file={file} url={URL.createObjectURL(file)} />
      </li>
    ))}
  </ul>
)

VideoList.propTypes = propTypes
VideoList.defaultProps = defaultProps

export default VideoList
