import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import flow from 'lodash/fp/flow'
import * as timelineActions from '../actions/timelineActions'
import sizes from '../constants/sizes'

const Clip = ({ style: variant, children, ...rest }) => {
  const { connectDropTarget, isOver, canDrop } = rest
  const backdrop = (
    <div
      style={{ ...style.backdrop, backgroundColor: canDrop ? 'green' : 'red' }}
    />
  )

  return connectDropTarget(
    <div style={{ ...style.component, ...variant }}>
      {isOver && backdrop}
      {children}
    </div>
  )
}

const style = {
  component: {
    position: 'absolute',
    display: 'flex',
    flexWrap: 'nowrap',
    border: '3px solid orange',
    borderRadius: 4,
    height: sizes.clip.height,
    overflow: 'hidden'
  },
  backdrop: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }
}

const clipTarget = {
  canDrop: (props, monitor) => {
    const item = monitor.getItem()
    return props.type === 'video' && item.type === 'filter'
  },
  drop: (props, monitor) => {
    const { clipKey: key } = props
    const { clip } = monitor.getItem()
    props.editClip({ type: 'video', key, clip })
  }
}

export default flow(
  DropTarget('media', clipTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),
  connect(
    null,
    dispatch => bindActionCreators(timelineActions, dispatch)
  )
)(Clip)
