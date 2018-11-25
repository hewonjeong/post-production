import React from 'react'
import ListWrap from '../layout/ListWrap'
import Media from '../components/Media'

const EffectList = ({ type, list }) => (
  <ListWrap>
    {list.map(({ name, ...rest }) => (
      <Media type={type} overlay={name} key={name} {...rest} />
    ))}
  </ListWrap>
)

export default EffectList
