import React from 'react'
import Tab from '../layout/Tab'
import Assets from '../modules/Assets'
import Export from '../modules/Export'

const Panel = () => (
  <Tab
    list={[
      { name: 'Assets', component: <Assets /> },
      { name: 'Share', component: <Export /> }
    ]}
  />
)

export default Panel
