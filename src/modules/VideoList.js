import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../actions/timelineActions'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'
import { getLastEnd } from '../selector/getTotal'

const VideoList = ({ entries, total, addClip }) =>
  entries.length ? (
    <ListWrap>
      {entries.map(([key, video]) => {
        const getClip = start => ({
          videoKey: key,
          start: start,
          end: start + video.duration
        })

        return <Media type="video" {...video} getClip={getClip} key={key} />
      })}
    </ListWrap>
  ) : (
    <p>파일을 추가하세요.</p>
  )

export default connect(
  ({ assets, timeline, meta }) => ({
    entries: Object.entries(assets),
    total: getLastEnd(timeline.video)
  }),
  dispatch => bindActionCreators(timelineActions, dispatch)
)(VideoList)
