import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import flow from 'lodash/fp/flow'
import * as timelineActions from '../actions/timelineActions'
import * as transitionsActions from '../actions/transitionsActions'
import sizes from '../constants/sizes'

const Transition = ({ style: variant, ...rest }) => {
  const { connectDropTarget, isOver, canDrop } = rest
  const backgroundColor = isOver ? (canDrop ? 'green' : 'red') : 'transparent'

  return connectDropTarget(
    <div style={{ ...style, ...variant, backgroundColor }} />
  )
}

const style = {
  backgroundColor: 'silver',
  position: 'absolute',
  top: 0,
  bottom: 0,
  height: sizes.clip.height,
  zIndex: 1
}

const transitionTarget = {
  canDrop: (props, monitor) => {
    const item = monitor.getItem()
    return item.type === 'transition'
  },
  drop: (props, monitor) => {
    const { clipKey, nextKey } = props
    const { clip } = monitor.getItem()
    props.editClip({ type: 'video', key: nextKey, clip })
    props.addTransition({ prev: clipKey, next: nextKey, name: 'crossFade' })
  }
}

export default flow(
  DropTarget('media', transitionTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),
  connect(
    null,
    dispatch =>
      bindActionCreators(
        { ...timelineActions, ...transitionsActions },
        dispatch
      )
  )
)(Transition)
