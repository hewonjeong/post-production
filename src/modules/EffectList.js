import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../actions/timelineActions'
import * as transitionsActions from '../actions/transitionsActions'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const EffectList = ({ list, addClip, editClip, addTransition, videoKeys }) => (
  <ListWrap>
    {list.map(({ name, fn }) => {
      const onClick = () => {
        fn({ addClip, editClip, addTransition }, videoKeys)
      }
      return <Media overlay={name} onClick={onClick} key={name} />
    })}
  </ListWrap>
)

export default connect(
  ({ timeline }) => ({ videoKeys: Object.keys(timeline.video) }),
  dispatch =>
    bindActionCreators({ ...timelineActions, ...transitionsActions }, dispatch)
)(EffectList)
