import React from 'react'
import Tab from '../layout/Tab'
import Assets from '../modules/Assets'
import effects from '../effects'
import EffectList from '../modules/EffectList'

const Panel = () => (
  <Tab
    list={[
      { name: '미디어 소스', component: <Assets /> },
      ...effects.map(({ name, list }) => ({
        name,
        component: <EffectList list={list} />
      }))
    ]}
  />
)

export default Panel
