import React from 'react'
import effects from '../effects'
import Tab from '../layout/Tab'
import Assets from './Assets'
import EffectList from './EffectList'
import Export from './Export'

const Panel = () => (
  <Tab
    list={[
      { name: '미디어 소스', component: <Assets /> },
      ...effects.map(({ type, name, list }) => ({
        name,
        component: <EffectList type={type} list={list} />
      })),
      { name: '결과물', component: <Export /> }
    ]}
  />
)

export default Panel
