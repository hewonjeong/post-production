import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../actions/timelineActions'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'
import getTotal from '../selector/getTotal'

const VideoList = ({ entries, total, addTimeline }) =>
  entries.length ? (
    <ListWrap>
      {entries.map(([key, video]) => {
        const onClick = () => {
          const clip = {
            videoKey: key,
            start: total,
            end: total + video.duration
          }
          addTimeline({ type: 'video', clip })
        }
        return <Media {...video} onClick={onClick} key={key} />
      })}
    </ListWrap>
  ) : (
    <p>파일을 추가하세요.</p>
  )

export default connect(
  ({ assets, timeline, meta }) => ({
    entries: Object.entries(assets),
    total: getTotal(timeline)
  }),
  dispatch => bindActionCreators(timelineActions, dispatch)
)(VideoList)
