import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../actions/timelineActions'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const EffectList = ({ list, addTimeline }) => (
  <ListWrap>
    {list.map(({ name, fn }) => {
      const onClick = () => {
        fn(addTimeline)
      }
      return <Media overlay={name} onClick={onClick} key={name} />
    })}
  </ListWrap>
)

export default connect(
  null,
  dispatch => bindActionCreators(timelineActions, dispatch)
)(EffectList)
