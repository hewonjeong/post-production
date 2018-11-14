import React from 'react'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const TransitionsList = [{ name: '크로스페이드', fn: () => {} }]

const Transitions = () => (
  <ListWrap>
    {TransitionsList.map(({ name, fn }) => {
      const onClick = () => {
        fn()
      }
      return <Media overlay={name} onClick={onClick} key={name} />
    })}
  </ListWrap>
)

export default Transitions
