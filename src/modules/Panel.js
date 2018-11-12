import React from 'react'
import Tab from '../layout/Tab'
import Assets from '../modules/Assets'
import Transitions from '../modules/Transitions'

const Panel = () => (
  <Tab
    list={[
      { name: '미디어 소스', component: <Assets /> },
      { name: '영상 전환', component: <Transitions /> }
    ]}
  />
)

export default Panel
