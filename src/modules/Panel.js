import React from 'react'
import Tab from '../layout/Tab'
import Assets from '../modules/Assets'

const Panel = () => <Tab list={[{ name: 'Assets', component: <Assets /> }]} />

export default Panel
