import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../actions/timelineActions'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const EffectList = ({ list, addClip, editClip, firstVideoKey }) => (
  <ListWrap>
    {list.map(({ name, fn }) => {
      const onClick = () => {
        fn({ addClip, editClip }, firstVideoKey)
      }
      return <Media overlay={name} onClick={onClick} key={name} />
    })}
  </ListWrap>
)

export default connect(
  ({ timeline }) => ({ firstVideoKey: Object.keys(timeline.video)[0] }),
  dispatch => bindActionCreators(timelineActions, dispatch)
)(EffectList)
